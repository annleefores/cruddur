# Week 0 — Billing and Architecture

## **Getting Started**

I began by completing all of the prerequisite tasks that I did not already know/have.

- Created a new AWS account with free tier benefits.
  - A neat trick I learned is that you can use same email to create different AWS account by using aliases.
  - For example if your email is example@example.com, then you can use example+something@example.com
- Did the free CCP course from Exampro to get familiar with AWS.
- Created Gitpod account.
- Created Momento Account.
- Obtained a Custom Domain Name from Porkbun.
- Signed up for Lucid Charts.
- Signed up for HoneyComb.io.
- Signed up for Rollbar.

## Project Scenario

The first thing I learned from the live session was how to understand the project and how an organization approaches it.
The way this is communicated through user personas has really helped me understand how things are done in an organization.

**Cruddur** is an ephemeral first micro blogging platform ( a lot like twitter but the posts are ephemeral like snapchat posts)

- Backend uses Flask micro web framework (Python)
- Frontend uses React
- The project includes
  - SQL and NoSQL Databases
  - Realtime Modern APIs
  - Multiple Container Services ( *Microservices)
  - A CI/CD Pipeline
  - Decentralized Authentication
  - And more

## Architecting Cloud

Before building out the project, clearly understand what the business wants, so discuss with technical and business team and make sure it satisfies all the facets of the project.

It should address the risks, assumptions and constraints.

There are 3 stages to designing an architectural diagram.

1. Conceptual Design
2. Logical Design
3. Physical Design

### Conceptual Design

This is a high level design where only the basic working of the project is depicted. Mostly used to convey the idea to business stakeholders or other non technical members. This type of designing is also called a **Napkin Design** because it can be drawn on a napkin when you get that spur-of-the-moment idea.

### Logical Design

In this stage of the design use the services provided by CSP to create a blueprint diagram of how each services are connected and used. Don't go into in depth details of each service just an icon and name indicating what it is. This type of design is also called a **Blueprint**.

### Physical Design

Represents the actual thing thats built including the specification of each services, IP address, ARN, API gateway, etc.

### Common Dictionary

- Ask dump questions
- Pretend that you are the end user interacting with this service.
- Document everything !!!

## Frameworks for building a project

### TOGAF

An architectural framework that provides methods and tools for assisting in the acceptance, production, use and maintenance of an enterprise architecture. Maps closely to AWS Well-Architected Tool.

### AWS Well-Architected Tool

An architectural framework provided by AWS to review your workloads againts current best practices.  

6 pillars of AWS Well-Architected Tool:

1. Operational Excellence
2. Security
3. Reliability
4. Performance Efficiency
5. Cost Optimization
6. Sustainability

AWS provides a service to check whether your project matches the framework guidelines or not

#### How to use AWS Well Architected Framework Service

Using **AWS Well-Architecte Framework Service** add all the basic details related to the project and then answer the checklists. These checklist questions are based on AWS Well-Architecte Framework. In the end a report will be prepared based on these inputs.

## Architectural Diagram

### [Lucid Chart](https://lucid.app/)

An online diagramming tool that's used in this bootcamp to create the diagrams. Has a limited free tier option.

_Other diagramming tools, guides and AWS assets can be found here [AWS Architecture Icons](https://aws.amazon.com/architecture/icons/)_

#### Adding AWS Icons

Open a new document -> Import Data -> Shapes ->Select **AWS Architecture 2021** (from Standard Libraries) -> Use Selected Shapes.

#### Working with Lucid Charts

- Shapes sections has all the icons list, can use search to find icons easily.
- Toolbar has all the usual text, shape formatting tools.
- Can add multiple sheets within a document
- A page area to create diagrams
  - **Enable Infinite Canvas**:  Right click on page area -> page settings -> toggle Infinite canvas
  - **Enable Line Jumps**:   Right click on page area -> page settings -> Line Settings -> Show Line Jumps

### Create Conceptual Design

Using shapes and arrows create a conceptual design the project.  

![Alt text](week0_media/Cruddur%20-%20Conceptual%20Diagram.png)

<p align='center'><img src='https://github.com/annleefores/aws-bootcamp-cruddur-2023/blob/main/journal/week0_media/Cruddur%20-%20Conceptual%20Diagram.png' width="80%"></p>


