# Week 2 — Distributed Tracing

## Required Homework

- [Live Stream](#observability)  
- [Instrument Honeycomb with OTEL](#honeycombio)
- [Instrument AWS X-Ray]()
- [Configure custom logger to send to CloudWatch Logs]()
- [Integrate Rollbar and capture and error]()
- [Observability Security Considerations]()
- [Observability Spending Considerations]()

## [Homework Challenges](#homework-challenges-1)

- [Learned about various Python package managers](#learned-about-various-python-package-managers)
- [AWS X-Ray Sub Segments](#aws-x-ray-sub-segments)
- [.env configuration for docker compose](#env-configuration-for-docker-compose)
- [Learned fundamentals of OpenTelemetry](#learned-fundamentals-of-opentelemetry)
- [Instrument Honeycomb for the frontend-application to observe network latency between frontend and backend](#instrument-honeycomb-for-the-frontend-application-to-observe-network-latency-between-frontend-and-backend)

---

## Observability

- Observability - monitoring a complicated system.
- Distributed Tracing - method of tracking application requests as they flow from frontend devices to backend services and databases.

## Honeycomb.io

> Website: [https://www.honeycomb.io/](https://www.honeycomb.io/)  
> Honeycomb Python Docs: [https://docs.honeycomb.io/getting-data-in/opentelemetry/python/](https://docs.honeycomb.io/getting-data-in/opentelemetry/python/)

- Login to [Honeycomb.io](https://ui.honeycomb.io/) and create an **Environment**.
- Copy environment API key and export these env variable to gitpod.  Whole project needs to use the same API key.

```bash
gp env HONEYCOMB_API_KEY="<api-key>"
gp env HONEYCOMB_SERVICE_NAME="<service-name>"

or 

export HONEYCOMB_API_KEY="<api-key>"
export HONEYCOMB_SERVICE_NAME="<service-name>"
```

- Set these env in `docker-compose.yml` under backend.  `OTEL_SERVICE_NAME` should be different for different services so it’s easy to identify different service.

```bash
OTEL_SERVICE_NAME: "backend-flask"
OTEL_EXPORTER_OTLP_ENDPOINT: "https://api.honeycomb.io"
OTEL_EXPORTER_OTLP_HEADERS: "x-honeycomb-team=${HONEYCOMB_API_KEY}"
```

- `cd` into backend and add these packages to `requirements.txt` and run `pip install -r requirements.txt`

```
opentelemetry-api 
opentelemetry-sdk
opentelemetry-exporter-otlp-proto-http
opentelemetry-instrumentation-flask
opentelemetry-instrumentation-requests
```

- Add these import statements in `app.py`

```python
from opentelemetry import trace
from opentelemetry.instrumentation.flask import FlaskInstrumentor
from opentelemetry.instrumentation.requests import RequestsInstrumentor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
```

- Initialize tracing and an exporter that can send data to Honeycomb - set this just below all the import statements. `OTLPSpanExporter()` → reads the Honeycomb env vars

```python
# Initialize tracing and an exporter that can send data to Honeycomb
provider = TracerProvider()
processor = BatchSpanProcessor(OTLPSpanExporter())
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)
tracer = trace.get_tracer(__name__)
```

- Initialize automatic instrumentation with Flask - add this below `app = Flask(__name__)`

```python
# Initialize automatic instrumentation with Flask
FlaskInstrumentor().instrument_app(app)
RequestsInstrumentor().instrument()
```

- Run `docker compose up`  and invoke some backend API usage to see if it is working.
- Data graph from Honeycomb.
    
![honeycomb-init-data](media/week2/images/honeycomb-init-data.png)
    
- Click trace to view - trace with only one span
    
![Trace](media/week2/images/trace.png)

### What is OpenTelemetry?

- OTEL - [OpenTelemetry](https://opentelemetry.io/) → Open source, High-quality, ubiquitous, and portable telemetry to enable effective observability.
    - OTEL is configured to send data to honeycomb through standardized system.
    - Many Distributed Tracing service use `OpenTelemetry`.

### Creating a span

- Add this line above class in `home_activities` service and change tracer name

```python
from opentelemetry import trace
tracer = trace.get_tracer("tracer.name.here")
```

- Add this line below the `def run()` and indent everything to get inside the `with` statement. Give a unique name.  ⚠️ name here is important

```python
with tracer.start_as_current_span("http-handler"):
```

- In Honeycomb, select recent traces with more that one span to view
    
![additional-span](media/week2/images/additional-span.png)

### Adding attribute to span

- Add these lines below in b/w `datetime.now` line like this and pass in the `now.isoformat()`to last line.

```python
span = trace.get_current_span()
now = datetime.now(timezone.utc).astimezone()
span.set_attribute("app.now", now.isoformat())
```

- Add this statement before return statement line.

```python
span.set_attribute("app.result_length", len(results))
```

- Select **Query** from Home in honeycomb.
- Set `COUNT` in **Visualize** and in **Group By**, select `trace.trace_id` and **RUN QUERY**.
- This Query language is not SQL, its a custom solution. Use the Query to filter out data.
- Set time to **Last 10 minutes.**

![Query](media/week2/images/query.png)

- Click any of the graph to go to span details. In this page select the span and search for `app.` to get `app.now` and `app.result_length`.

![span-details](media/week2/images/span-details.png)

### Heatmap

- Select **New Query** from LHS
- set **Visualize** to **HEATMAP(duration_ms)** and **P90(duration_ms),** then run query.

![heat-map](media/week2/images/heat-map.png)

## Homework Challenges

### Learned about various Python package managers

- The live stream discussion about Python's poor package management got me thinking, so I looked into solutions like [pipenv](https://github.com/pypa/pipenv) and [poetry](https://python-poetry.org/).
- After learning the fundamentals and comparing them, I've decided to use poetry in all of my future Python projects.

### AWS X-Ray Sub Segments

- Modified *user_activitities.py* based on the GitHub sample code [given here](https://github.com/aws/aws-xray-sdk-python#start-a-custom-segmentsubsegment).
- However, when I use *begin_subsegment*, it throws a *SegmentNotFoundException*.
- According to the [linked article](https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-python-middleware.html), when middleware is enabled in a flask application, it automatically creates a segment and uses it for each sampled request.
    
> *When you add the middleware to your application and configure a segment name, the X-Ray SDK for Python creates a segment for each sampled request. This segment includes timing, method, and disposition of the HTTP request. Additional instrumentation creates subsegments on this segment.*

- So perhaps the error occurs because I'm inserting another segment within one that has already been created by middleware.
- According to the same article, the example given in the GitHub docs is for [instrumenting manually in code](https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-python-middleware.html#xray-sdk-python-middleware-manual) when there is no middleware.
- To put the above statement to the test, I wrote a standalone Python program with segments and subsegments that I ran while the x-ray daemon was running.

```python
from aws_xray_sdk.core import xray_recorder

# Start a segment
segment = xray_recorder.begin_segment('test_segment')
# Start a subsegment
subsegment = xray_recorder.begin_subsegment('test_subsegment')

segment.put_metadata('data', {1: "data1", 2: "data2"})
subsegment.put_metadata('key', '12345')

# Close the subsegment and segment
xray_recorder.end_subsegment()
xray_recorder.end_segment()

print("done")
```

- And I got the custom segment and subsegment data without any problems.

![custom-segment-data-standalone](media/week2/images/custom-segment-data-standalone.png)

- So I guess I shouldn't use *begin_subsegment* inside an X-Ray middleware application.
- I was able to get results using subsegment.

```python
class UserActivities:
  def run(user_handle):
    model = {
      'errors': None,
      'data': None
    }

    # x-ray subsegment
    subsegment = xray_recorder.begin_subsegment('sub_user_activities')
    now = datetime.now(timezone.utc).astimezone()

    data = {
    "about": "this is a user_activities subsegment",
    "time":now.isoformat(),
    "model_data":model
    }

    subsegment.put_metadata('data', data)
    xray_recorder.end_subsegment()
```

![subsegment_working_in_flask](media/week2/images/subsegment_working_in_flask.png)

**Reference:**

- [https://github.com/aws/aws-xray-sdk-python#start-a-custom-segmentsubsegment](https://github.com/aws/aws-xray-sdk-python#start-a-custom-segmentsubsegment)
- [https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-python-subsegments.html](https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-python-subsegments.html)
- [https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-python-middleware.html](https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-python-middleware.html)

### `.env` configuration for docker compose

- I created a `.env` file for docker compose so that I can work on the local machine without constantly setting env vars.

**Reference:**
- [https://docs.docker.com/compose/environment-variables/set-environment-variables/](https://docs.docker.com/compose/environment-variables/set-environment-variables/)

### Learned fundamentals of OpenTelemetry

- I decided to watch a [freecodecamp video about OpenTelemetry](https://youtu.be/r8UvWSX3KA8) because I was still having trouble understanding all of the jargons and use cases.
- I learned about OTEL and observation.

### Instrument Honeycomb for the frontend-application to observe network latency between frontend and backend

> Honeycomb browser tracing: [https://docs.honeycomb.io/getting-data-in/opentelemetry/browser-js/](https://docs.honeycomb.io/getting-data-in/opentelemetry/browser-js/)

Network latency is the time it takes for a packet of data to travel from one point to another. In web applications, network latency can affect the performance and user experience of frontend browser and backend server.

OpenTelemetry browser traces are sent via OTLP with HTTP/JSON. Sensitive data is never safe in the browser. So its recommend to not expose Honeycomb API keys in the browser application’s code. This means we need some kind of proxy to accept any browser traces before sending them to Honeycomb. The most common and recommended solution is to use an [OpenTelemetry Collector](https://docs.honeycomb.io/getting-data-in/otel-collector/).

![frontend-otel](media/week2/images/frontend-otel.png)

#### Configuring  `OpenTelemetry Collector`

- Tried out the demo OTEL Collector example → [https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/examples/demo](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/examples/demo)
- Add [OTEL Collector container instructions](https://opentelemetry.io/docs/collector/getting-started/#docker-compose) to `docker-compose.yml`.

```yaml
#OTEL Collector
otel-collector:
  image: otel/opentelemetry-collector
  command: [--config=/etc/otel-collector-config.yaml]
  volumes:
    - ./otel-collector-config.yaml:/etc/otel-collector-config.yaml
  ports:
    - 4318:4318 # OTLP http receiver
```

- Add `otel-collector-config.yaml` for **[Browser Telemetry](https://docs.honeycomb.io/getting-data-in/otel-collector/#browser-telemetry).**

```yaml
receivers:
  otlp:
    protocols:
      http: # port 4318
        cors:
          allowed_origins:
            - "http://*.<yourdomain>.com"
            - "https://*.<yourdomain>.com"

processors:
  batch:

exporters:
  otlp:
    endpoint: "api.honeycomb.io:443"
    headers:
      "x-honeycomb-team": "${HONEYCOMB_API_KEY}"
  logging:
    loglevel: debug
    
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp, logging]
```

- `docker compose up`
- OTEL Collector container up and running.

```bash
#OTEL Collector Logs

2023-03-03T06:24:38.651Z        info    service/telemetry.go:90 Setting up own telemetry...
2023-03-03T06:24:38.652Z        info    service/telemetry.go:116        Serving Prometheus metrics      {"address": ":8888", "level": "Basic"}
2023-03-03T06:24:38.656Z        info    service/service.go:140  Starting otelcol...     {"Version": "0.72.0", "NumCPU": 8}
2023-03-03T06:24:38.656Z        info    extensions/extensions.go:41     Starting extensions...
2023-03-03T06:24:38.657Z        warn    internal/warning.go:51  Using the 0.0.0.0 address exposes this server to every network interface, which may facilitate Denial of Service attacks   {"kind": "receiver", "name": "otlp", "data_type": "traces", "documentation": "https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/security-best-practices.md#safeguards-against-denial-of-service-attacks"}
2023-03-03T06:24:38.657Z        info    otlpreceiver@v0.72.0/otlp.go:112        Starting HTTP server    {"kind": "receiver", "name": "otlp", "data_type": "traces", "endpoint": "0.0.0.0:4318"}
2023-03-03T06:24:38.657Z        info    service/service.go:157  Everything is ready. Begin running and processing data.
```

#### Checking OTEL Collector

- Ran this curl command to make sure OTEL collector is working as indented.

```bash
curl -i http://localhost:4318/v1/traces -H "Origin: http://localhost:3000" -H "Access-Control-Request-Method: POST" -H "Access-Control-Request-Headers: X-Requested-With" -H "Content-Type: application/json" -X OPTIONS --verbose
```

- Got this response. So OTEL Collector is working.

```bash
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: X-Requested-With
Access-Control-Allow-Methods: POST
Access-Control-Allow-Origin: http://localhost:3000
Vary: Origin
Vary: Access-Control-Request-Method
Vary: Access-Control-Request-Headers
Date: Fri, 03 Mar 2023 07:58:06 GMT
```

## Frontend OTEL

- Install the following npm packages ([based on Honeycomb Browser guide](https://docs.honeycomb.io/getting-data-in/opentelemetry/browser-js/#instrumentation-packages))

```bash
npm install --save \
    @opentelemetry/api \
    @opentelemetry/sdk-trace-web \
    @opentelemetry/exporter-trace-otlp-http \
    @opentelemetry/context-zone
```

- Export env variable (only on localhost)

```bash
OTEL_COLLECTOR_URL=http://localhost:4318
```

- Add this environment variable to the frontend docker-compose instruction.

```yaml
REACT_APP_OTEL_COLLECTOR_URL: "${OTEL_COLLECTOR_URL}"
```

- Create a file `tracing.js` inside `src/otel/` folder and add this code.

```jsx
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { WebTracerProvider, BatchSpanProcessor } from '@opentelemetry/sdk-trace-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { Resource }  from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const exporter = new OTLPTraceExporter({
  url: `${process.env.REACT_APP_OTEL_COLLECTOR_URL}/v1/traces`
});
const provider = new WebTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "frontend-react-js",
  }),
});
provider.addSpanProcessor(new BatchSpanProcessor(exporter));
provider.register({
  contextManager: new ZoneContextManager()
});
```

- Import this file in `index.js`

```jsx
import "./otel/tracing.js"; // otel collector
```

- Add instrumentation for actions in `pages/HomeFeedPage.js`

```java
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer();

const rootSpan = tracer.startActiveSpan('document_load', span => {
  span.setAttribute('pageUrlwindow', window.location.href);
  window.onload = (event) => {
    
    span.end(); 
  };
});
```

#### Troubleshooting Frontend - OTEL Collector Communication

- This error was appearing in my Collector logs.

```java
Exporting failed. The error is not retryable. Dropping data.    {"kind": "exporter", "data_type": "traces", "name": "otlp", "error": "Permanent error: rpc error: code = Unauthenticated desc = missing 'x-honeycomb-team' header", "dropped_items": 1}
```

- When looking for solutions, I came across this [test span writeup by Jessica Kerr](https://www.honeycomb.io/blog/test-span-opentelemetry-collector) in a honeycomb blog.
- So I experimented by sending a curl request with Insomnia.

![insomnia-test](media/week2/images/insomnia-test.png)

- The issue was that I did not pass *HONEYCOMB_API_KEY* to OTEL Collector environment via docker compose. So, in *docker-compose.yml*, I added this variable to the otel-collector service.

```yaml
#OTEL Collector
otel-collector:
  environment:
     HONEYCOMB_API_KEY: "${HONEYCOMB_API_KEY}"
  image: otel/opentelemetry-collector
  command: [--config=/etc/otel-collector-config.yaml]
  volumes:
    - ./otel-collector-config.yaml:/etc/otel-collector-config.yaml
  ports:
    - 4318:4318 # OTLP http receiver
```

- Following that, test data results began to appear on the Honeycomb dashboard.

#### Testing Frontend Tracing

- Opened frontend homepage to trigger document-load span.
- Received trace data in Honeycomb dashboard

![frontend-trace-data](media/week2/images/frontend-trace-data.png)

#### Connecting the Frontend and Backend Traces

- [Automatically Propagate the Trace Context Header](https://docs.honeycomb.io/getting-data-in/opentelemetry/browser-js/#automatically-propagate-the-trace-context-header)
- Install the npm dependencies.

```bash
npm install --save \
    @opentelemetry/instrumentation \
    @opentelemetry/instrumentation-xml-http-request \
    @opentelemetry/instrumentation-fetch
```

- Import dependencies into `HomeFeedPage.js`

```jsx
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
```

- Replace the previous *rootSpan page-load* code with this one.
- I created the backend URL regex using the new ChatGPT powered Bing.

```jsx
registerInstrumentations({
  instrumentations: [
    new XMLHttpRequestInstrumentation({
      propagateTraceHeaderCorsUrls: [
         /.+/g, /^http:\/\/localhost:4567\/.*$/
      ]
    }),
    new FetchInstrumentation({
      propagateTraceHeaderCorsUrls: [
         /.+/g, /^http:\/\/localhost:4567\/.*$/
      ]
    }),
  ],
});
```

- When I tried to open the frontend, I received this CORS error.

```bash
Request header field traceparent is not allowed by Access-Control-Allow-Headers in preflight response.
```

- The headers relayed by the frontend.

```bash
Referer: http://localhost:3000/
sec-ch-ua: "Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"
sec-ch-ua-mobile: ?1
sec-ch-ua-platform: "Android"
traceparent: 00-d9aa63dc2816eff5b0ee5729cc15cb4a-3940695fd6146820-01
```

- The issue was not resolved for some reason even after allowing `traceparent` in flask.
- One of the bootcamp member, Allan Hsu#4942, had already posted a solution to this problem.
- According to the [flask-cors docs](https://flask-cors.readthedocs.io/en/latest/configuration.html), CORS_ALLOW_HEADERS must be a string or a list. So I replaced the existing `allow_headers`  string with a list in `app.py`, which resolved the CORS error.

```python
cors = CORS(
    app,
    resources={r"/api/*": {"origins": origins}},
    expose_headers="location,link",
    allow_headers=["content-type", "if-modified-since", "traceparent"],
    methods="OPTIONS,GET,HEAD,POST",
)
```

- I can now see the entire distributed trace between the frontend and backend in the Honeycomb dashboard.

![frontend-backend-distributed-tracing](media/week2/images/frontend-backend-distributed-tracing.png)

- Changes were made to the code to ensure that the OTEL frontend-backend trace worked correctly in Gitpod and local development.
- Tracing results in Gitpod.

![gitpod-tracing-results](media/week2/images/gitpod-tracing%20results.png)

- I added some extra automatic instrumentation to check Document Load and User Interaction.

```bash
npm install --save \
    @opentelemetry/instrumentation-document-load \
    @opentelemetry/instrumentation-user-interaction \
    @opentelemetry/instrumentation-long-task
```

```jsx
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';

// ...general opentelemetry configuration

registerInstrumentations({
    instrumentations: [new DocumentLoadInstrumentation()],
  });

  registerInstrumentations({
    instrumentations: [new UserInteractionInstrumentation()],
  });

```

![document-tracing](media/week2/images/document-tracing.png)
![user-interaction](media/week2/images/user-interaction.png)

**Reference:**

- [https://docs.honeycomb.io/getting-data-in/opentelemetry/browser-js/](https://docs.honeycomb.io/getting-data-in/opentelemetry/browser-js/)
- [https://docs.honeycomb.io/getting-data-in/otel-collector/](https://docs.honeycomb.io/getting-data-in/otel-collector/)
- [https://opentelemetry.io/docs/collector/getting-started/](https://opentelemetry.io/docs/collector/getting-started/)
- [https://opentelemetry.io/docs/instrumentation/js/getting-started/browser/](https://opentelemetry.io/docs/instrumentation/js/getting-started/browser/)
- [https://opentelemetry.io/docs/instrumentation/js/instrumentation/](https://opentelemetry.io/docs/instrumentation/js/instrumentation/)
- [https://www.honeycomb.io/blog/test-span-opentelemetry-collector](https://www.honeycomb.io/blog/test-span-opentelemetry-collector)