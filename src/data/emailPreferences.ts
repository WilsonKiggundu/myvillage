import {IEmailPreference} from "../interfaces/IEmailPreference";

export const emailPreferences = (): IEmailPreference[] => [
    {
        id: 'profileIsIncomplete',
        secondaryLabel: 'Remind me to update my profile',
        primaryLabel: 'Complete your profile',
        section: 'Profile'
    },
    {
        id: 'youAreFollowed',
        secondaryLabel: 'When someone follows me',
        primaryLabel: 'Follows',
        section: 'Profile'
    },
    {
        id: 'peopleYouFollowPostSomething',
        secondaryLabel: 'When someone I follow posts something',
        primaryLabel: 'Posts by people I follow',
        section: 'Posts'
    },
    {
        id: 'yourPostIsLiked',
        secondaryLabel: 'When someone likes my post',
        primaryLabel: 'Post likes',
        section: 'Posts'
    },
    {
        id: 'articleIsPosted',
        secondaryLabel: 'When a blog article is posted',
        primaryLabel: 'Blog articles',
        section: 'Posts'
    },
    {
        id: 'weeklyBlogDigest',
        secondaryLabel: 'Send me a digest of the blog articles published in the week',
        primaryLabel: 'Weekly Digest',
        section: 'Posts'
    },
    {
        id: 'eventIsPosted',
        secondaryLabel: 'Whenever a new event is posted',
        primaryLabel: 'New events',
        section: 'Events'
    },
    {
        id: 'eventReminders',
        secondaryLabel: 'Remind me to register for an upcoming event',
        primaryLabel: 'Events happening soon',
        section: 'Events'
    },
    {
        id: 'jobIsPosted',
        secondaryLabel: 'Send me an email whenever a new job is posted',
        primaryLabel: 'New jobs',
        section: 'Jobs'
    },
    {
        id: 'applyForJobReminder',
        secondaryLabel: 'Remind me to apply for a job',
        primaryLabel: 'Job applications',
        section: 'Jobs'
    },
    {
        id: 'jobAppliedForReminder',
        secondaryLabel: 'Send me emails about jobs that I apply for',
        primaryLabel: 'Jobs I applied for',
        section: 'Jobs'
    },
    {
        id: 'thereAreSystemUpdates',
        secondaryLabel: 'Send me emails about new features',
        primaryLabel: 'System Updates',
        section: 'Updates',
        disabled: true
    }
]