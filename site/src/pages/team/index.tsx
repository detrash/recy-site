import { GetStaticProps } from 'next';
import AvatarCard from 'src/components/AvatarCard';
import { CompactAvatarCard } from 'src/components/CompactAvatarCard';
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
          className="absolute inset-0 top-80 md:mt-24 mb-3 lg:mt-0 bg-gradient-to-br from-blue-500 to-teal-400 pointer-events-none -z-10"
          aria-hidden="true"
        ></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="max-w-3xl mx-auto text-center pb-4">
              <h2 className="h2 mb-4">{messages?.pageTitle}</h2>
            </div>
            <section className="mb-4">
              <div className="max-w-3xl">
                <h2 className="font-bold text-xl sm:text-2xl mb-4">
                  {messages?.advisorsTitle}
                </h2>
              </div>
              <div className="max-w-sm grid gap-6 md:grid-cols-2 md:max-w-2xl lg:max-w-none mb-20">
                {messages?.advisors &&
                  messages.advisors.map((advisor) => (
                    <CompactAvatarCard
                      key={advisor.memberName}
                      avatar={advisor.memberPhoto?.url}
                      linkedInUrl={advisor?.linkedInUrl}
                      jobPosition={advisor?.jobPosition}
                      name={advisor?.memberName}
                    />
                  ))}
              </div>
            </section>

            <section className="mb-4">
              <div className="max-w-3xl">
                <h2 className="font-bold text-xl sm:text-2xl mb-4 text-white">
                  {messages?.partnerInvestorsTitle}
                </h2>
              </div>
              <div className="max-w-sm grid gap-6 md:grid-cols-2 md:max-w-2xl lg:max-w-none mb-20">
                {messages?.partnerInvestors &&
                  messages.partnerInvestors.map((partnerInvestor) => (
                    <CompactAvatarCard
                      key={partnerInvestor.memberName}
                      avatar={partnerInvestor.memberPhoto?.url}
                      linkedInUrl={partnerInvestor?.linkedInUrl}
                      jobPosition={partnerInvestor?.jobPosition}
                      name={partnerInvestor?.memberName}
                    />
                  ))}
              </div>
            </section>

            <section className="mb-4">
              <div className="max-w-3xl">
                <h2 className="font-bold text-xl sm:text-2xl mb-4 text-white">
                  {messages?.foundersTitle}
                </h2>
              </div>

              <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 items-start md:max-w-2xl lg:max-w-none">
                {messages?.founders &&
                  messages.founders.map((founder) => (
                    <AvatarCard
                      avatar={founder.memberPhoto?.url}
                      description={founder?.jobDescription}
                      githubUrl={founder?.githubUrl}
                      instagramUrl={founder?.instagramUrl}
                      jobPosition={founder?.jobPosition}
                      key={founder?.memberName}
                      linkedInUrl={founder?.linkedInUrl}
                      name={founder?.memberName}
                      twitterUrl={founder?.twitterUrl}
                    />
                  ))}
              </div>
            </section>
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
