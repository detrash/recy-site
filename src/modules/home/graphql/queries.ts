import { gql } from '@apollo/client';

export type HomePageData = {
  ctaButton: string;
  ctaSubTitle: string;
  ctaTitle: string;
  ctaTitleEffect: string;
  emailPlaceholder: string;
  featuresBlockItem1Desc: string;
  featuresBlockItem1Title: string;
  featuresBlockItem2Desc: string;
  featuresBlockItem2Title: string;
  featuresBlockItem3Desc: string;
  featuresBlockItem3Title: string;
  featuresBlockSubTitle: string;
  featuresBlockTitle: string;
  featuresHomeItem1: string;
  featuresHomeItem2: string;
  featuresHomeItem3: string;
  featuresHomeSubTitle: string;
  featuresHomeTitle: string;
  formContactButton: string;
  formContactSubTitle: string;
  formContactTitle: string;
  homeButton: string;
  messagePlaceholder: string;
  namePlaceholder: string;
  pageSubTitle: string;
  pageTitle: string;
  pageTitleEffect: string;
  testimonialsButton1: string;
  testimonialsButton2: string;
  testimonialsSubTitle: string;
  testimonialsTitle: string;
  homeImages: {
    url: string;
    width: number;
    height: number;
  }[];
};

export type RecyPageData = {
  addRecyButtonLabel: string;
  bannerButton: string;
  bannerDescription: string;
  bannerTitle: string;
  contractButtonLabel: string;
  pageEffectTitle: string;
  pageSubtitle: string;
  pageTitle: string;
  whitepaperButtonLabel: string;
};

export type RoadMapPageData = {
  pageSubtitle: string;
  pageTitle: string;
  panelDescription: string;
  titleEffect: string;
  roadmapImage: {
    url: string;
    width: number;
    height: number;
  };
};

export type TeamPageData = {
  pageTitle: string;
  teamMember: {
    memberName: string;
    memberPhoto: {
      url: string;
    };
    twitterUrl: string;
    instagramUrl: string;
    githubUrl: string;
    jobDescription: string;
    jobPosition: string;
    linkedInUrl: string;
  }[];
};

export type PrivacyPolicyData = {
  privacyPolicyTitle: string;
  privacyPolicyText: {
    html: string;
  };
};

export const getHomePageQuery = gql`
  query getHomePageQuery($locale: Locale!) {
    homePages(locales: [$locale]) {
      homePageJSON
      homeImages {
        url
        width
        height
      }
    }
  }
`;

export const getRecyPageQuery = gql`
  query getRecyPageQuery($locale: Locale!) {
    recyPages(locales: [$locale]) {
      addRecyButtonLabel
      bannerButton
      bannerDescription
      bannerTitle
      contractButtonLabel
      pageEffectTitle
      pageSubtitle
      pageTitle
      whitepaperButtonLabel
    }
  }
`;

export const getRoadMapPageQuery = gql`
  query getRoadMapPageQuery($locale: [Locale!]!) {
    roadmapPages(locales: $locale) {
      pageSubtitle
      pageTitle
      panelDescription
      titleEffect
      roadmapImage {
        url(transformation: { document: { output: { format: webp } } })
        width
        height
      }
    }
  }
`;

export const getTeamPageQuery = gql`
  query getTeamPageQuery($locale: [Locale!]!) {
    teamPages(locales: $locale) {
      pageTitle
      teamMember {
        memberName
        memberPhoto {
          url(
            transformation: {
              image: { resize: { fit: crop, height: 176, width: 176 } }
            }
          )
        }
        twitterUrl
        instagramUrl
        githubUrl
        jobDescription
        jobPosition
        linkedInUrl
      }
    }
  }
`;

export const getPrivacyPolicyPageQuery = gql`
  query getPrivacyPolicyPageQuery($locale: Locale!) {
    privacyPolicyPages(locales: [$locale]) {
      privacyPolicyTitle
      privacyPolicyText {
        html
      }
    }
  }
`;
