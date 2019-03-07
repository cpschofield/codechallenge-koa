import * as joi from 'joi';
import { logger } from '../service';

const seasonItem = joi.object({
  slug: joi.string(),
});

const payloadItem = joi
  .object({
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
  })
  .min(1);

const requestJsonFormatRule = joi
  .object({
    payload: joi
      .array()
      .items(payloadItem)
      .required(),
    skip: joi.number().required(),
    take: joi.number().required(),
    totalRecords: joi.number().required(),
  })
  .required();

export const validateRequestJSON = async (obj) => {
  const res = joi.validate(obj, requestJsonFormatRule);
  if (res.error) {
    logger.info(res.error.message);
    res.error.message = 'Could not decode request: JSON parsing failed';
  }

  return res;
};
