const AWS = require('aws-sdk')
const config = require('./config')
const path = require('path')
const { v4: uuid } = require('uuid')

const s3 = new AWS.S3(config.s3)

function uuidFilenameTransform (filename = '') {
  const fileExtension = path.extname(filename)

  return `${uuid()}${fileExtension}`
}

class S3Uploader {
  constructor (s3, config) {
    const {
      baseKey = '',
      uploadParams = {},
      concurrencyOptions = {}
    } = config

    this._s3 = s3
    this._baseKey = baseKey.replace('/$', '')
    this._uploadParams = uploadParams
    this._concurrencyOptions = concurrencyOptions
  }

  async upload (stream, { filename, mimetype }) {
    const transformedFilename = uuidFilenameTransform(filename)

    const { Location } = await this._s3
      .upload(
        {
          ...this._uploadParams,
          Body: stream,
          Key: `${this._baseKey}/${transformedFilename}`,
          ContentType: mimetype
        },
        this._concurrencyOptions
      )
      .promise()

    return Location
  }
}

const s3AvatarUploader = new S3Uploader(s3, {
  baseKey: 'snip721nfts',
  uploadParams: {
    CacheControl: 'max-age:31536000',
    ContentDisposition: 'inline'
  }
})

module.exports = s3AvatarUploader
