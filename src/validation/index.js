import * as joi from 'joi';

const seasonItem = joi.object({
  slug: joi.string(),
});

const payloadItem = joi.object({
  country: joi.string(),
  description: joi.string(),
  drm: joi.boolean(),
  episodeCount: joi.number(),
  genre: joi.string(),
  image: joi.object({
    showImage: joi.string().required(),
  }),
  language: joi.string(),
  nextEpisode: joi
    .object({
      channel: joi.string().allow(null),
      channelLogo: joi.string(),
      date: joi.string().allow(null),
      html: joi.string(),
      url: joi.string(),
    })
    .allow(null),
  primaryColour: joi.string(),
  seasons: joi
    .array()
    .items(seasonItem)
    .allow(null),
  slug: joi.string(),
  title: joi.string(),
  tvChannel: joi.string(),
});

const requestJsonFormatRule = joi
  .object({
    payload: joi.array().items(payloadItem),
    skip: joi.number().required(),
    take: joi.number().required(),
    totalRecords: joi.number().required(),
  })
  .required();

export const validateRequestJSON = async obj => joi.validate(obj, requestJsonFormatRule);
