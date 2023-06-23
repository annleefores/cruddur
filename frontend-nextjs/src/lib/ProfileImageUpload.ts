import axios from "axios";

export const S3Upload = async (profileImage: File, token: string) => {
  console.log(profileImage);
  const filename = profileImage.name;
  const type = profileImage.type;
  const fileparts = filename.split(".");
  const extension = fileparts[fileparts.length - 1];
  const presignedurl = await S3UploadKey(extension, token);

  try {
    console.log("s3 upload");
    const res = await axios.put(presignedurl, profileImage, {
      headers: {
        "Content-Type": type,
      },
    });
    if (res.status === 200) {
    } else {
      return res.data;
    }
  } catch (err) {
    console.log(err);
  }
};

const S3UploadKey = async (extension: string, token: string) => {
  try {
    console.log("ext", extension);

    const gateway_url = `${process.env.NEXT_PUBLIC_API_GATEWAY_ENDPOINT_URL}/avatars/key_upload`;

    const res = await axios.post(
      gateway_url,
      { extension: extension },
      {
        headers: {
          Origin: process.env.NEXT_PUBLIC_FRONTEND_URL,
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.data;
    if (res.status === 200) {
      return data.url;
    }
  } catch (err) {
    console.log(err);
  }
};
