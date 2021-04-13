import { GetServerSideProps } from 'next';
import { gql } from 'graphql-request';
import { getServerSideSitemap } from 'next-sitemap';
import { ISitemapFiled } from 'next-sitemap/dist/@types/interface';
import { createClient } from 'libs/graphql';
import { Query, QueryQualificationsArgs } from 'libs/graphql';
import { WEBSITE_URL, QUESTIONS } from 'config/app';
import { Route } from 'config/routing';
import resolveAs from 'utils/resolveAs';

const QUERY_QUALIFICATIONS = gql`
  query qualifications($sort: [String!], $limit: Int) {
    qualifications(sort: $sort, limit: $limit) {
      items {
        slug
      }
    }
  }
`;
const LIMIT = 1000;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const client = createClient();
  let fields: ISitemapFiled[] = [];

  try {
    const {
      qualifications: { items },
    } = await client.request<
      Pick<Query, 'qualifications'>,
      QueryQualificationsArgs
    >(QUERY_QUALIFICATIONS, { limit: LIMIT, sort: ['code ASC'] });
    if (Array.isArray(items)) {
      fields = ([] as typeof fields).concat(
        ...QUESTIONS.map(limit => {
          return items.map(
            (item): ISitemapFiled => {
              return {
                loc: `${WEBSITE_URL}${resolveAs({
                  pathname: Route.TestPage,
                  query: { slug: item.slug, limit },
                })}`,
                lastmod: new Date().toISOString(),
                changefreq: 'always',
              };
            }
          );
        })
      );
    }
  } catch (e) {
    console.log('server-sitemap.xml', e.message);
  }

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
const Index = () => <div />;

export default Index;
