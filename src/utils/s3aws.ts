import { RNS3 } from 'react-native-aws3';

import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_STORAGE_BUCKET_NAME } from "@env";
import { Platform } from 'react-native';
import { generateString } from '.';

const events_options = {
    keyPrefix: 'images/',
    bucket: AWS_STORAGE_BUCKET_NAME,
    region: 'us-east-1',
    accessKey: AWS_ACCESS_KEY_ID,
    secretKey: AWS_SECRET_ACCESS_KEY,
    successActionStatus: 201
}

export const uploadImage = (uri: string, imageName: string, mime = 'image/jpg') => {
    return new Promise((resolve, reject) => {
        const file = {
            uri: uri,
            name: imageName+generateString(),
            type: "image/jpg"
        };
        RNS3.put(file, events_options).then((response:any) => {            
            if (response.status !== 201) {
                reject(new Error('Failed to upload image to S3'));
            } else {
                resolve(response.body.postResponse.location);
            }
        });
    });
}