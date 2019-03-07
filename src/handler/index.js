import { logger } from '../service';

export const mapShowBriefResponse = async (ctx) => {
  logger.info('mapShowBriefResponse');
  const validRecords = ctx.request.body.payload
    .filter(record => record.drm === true && record.episodeCount > 0)
    .map((record) => {
      const obj = { image: null, slug: null, title: null };
      if (record.image) obj.image = record.image.showImage;
      if (record.slug) obj.slug = record.slug;
      if (record.title) obj.title = record.title;
      return obj;
    });
  ctx.body = { response: validRecords };
  ctx.status = 200;
};
