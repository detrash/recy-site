import { GetStaticProps } from 'next';
import AvatarCard from 'src/components/AvatarCard';
import { getTeamPageQuery, TeamPageData } from 'src/graphql/queries';
import { apolloClient } from 'src/lib/apollo';

type TeamPageProps = {
  messages: TeamPageData;
};

const Team: React.FC<TeamPageProps> = ({ messages }) => {
  return (
    <main className="flex-grow">
      <section className="relative">
        <div
          className="absolute inset-0 top-1/4 md:mt-24 mb-3 lg:mt-0 bg-accent pointer-events-none"
          aria-hidden="true"
        ></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="max-w-3xl mx-auto text-center pb-4">
              <h2 className="h2 mb-4">{messages?.pageTitle}</h2>
            </div>

            <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 items-start md:max-w-2xl lg:max-w-none">
              {messages?.teamMember &&
                messages.teamMember.map((teamMember) => (
                  <AvatarCard
                    avatar={teamMember.memberPhoto?.url}
                    description={teamMember?.jobDescription}
                    githubUrl={teamMember?.githubUrl}
                    instagramUrl={teamMember?.instagramUrl}
                    jobPosition={teamMember?.jobPosition}
                    key={teamMember?.memberName}
                    linkedInUrl={teamMember?.linkedInUrl}
                    name={teamMember?.memberName}
                    twitterUrl={teamMember?.twitterUrl}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, locales }) => {
  const otherLocale =
    locales?.filter((location) => location !== locale)[0] || '';
  const { data } = await apolloClient.query({
    query: getTeamPageQuery,
    variables: {
      locale: [locale, otherLocale],
    },
  });
  if (data) {
    return {
      props: {
        messages: {
          ...data.teamPages[0],
          ...(await import(`src/i18n/${locale}.json`)).default,
        },
      },
      revalidate: 60 * 60 * 24, // 1 day
    };
  }

  return {
    props: {},
  };
};

export default Team;
