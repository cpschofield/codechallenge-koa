import { logger } from '../service';

export const mapShowBriefResponse = async (ctx) => {
  logger.info('mapShowBriefResponse');
  const validRecords = ctx.request.body.payload
    .filter(record => record.drm === true && record.episodeCount > 0)
    .map(record => ({
      image: record.image.showImage,
      slug: record.slug,
      title: record.title,
    }));
  ctx.body = { response: validRecords };
  ctx.status = 200;
};