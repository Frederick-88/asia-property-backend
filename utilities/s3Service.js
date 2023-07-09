const { S3 } = require("aws-sdk");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const uuid = require("uuid").v4;

exports.s3UploadV2 = async (files) => {
  const s3 = new S3();

  const params = files.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${uuid()}-${file.originalname}`, // to automatically create and store inside "uploads" folder
      Body: file.buffer,
    };
  });

  const results = await Promise.all(
    params.map((param) => s3.upload(param).promise())
  );

  return results;
};

exports.s3UploadV3 = async (files) => {
  const s3client = new S3Client();

  const params = files.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${uuid()}-${file.originalname}`, // to automatically create and store inside "uploads" folder
      Body: file.buffer,
    };
  });

  const results = await Promise.all(
    params.map((param) => s3client.send(new PutObjectCommand(param)))
  );
  const prefixList = params.map((item) => {
    return item.Key;
  });

  results.forEach((item, index) => {
    // create a new field as aws-sdk version 3 doesn't return S3 URL
    item.Location = `${process.env.AWS_S3_URL}/${prefixList[index]}`;
  });

  return results;
};
