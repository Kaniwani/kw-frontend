export default {
  count: 35,
  next: null,
  previous: null,
  results: [
    {
      title: "Mobile Input Regression (Fixed)",
      body:
        "<p>Adding Microsoft IME support caused an issue for some users with mobile keyboards that offer autocomplete suggestions. This caused them to block auto-converting from en -> kana. This is now remedied!</p>",
      pub_date: "2017-08-06T09:09:10.082023Z",
      creator: "Subversity",
    },
    {
      title: "Microsoft IME Fixed",
      body:
        "<p>There were some residual issues with input via the Microsoft IME, mainly regarding ‘tt’ -> ‘っ’.  These have now been fixed. If you notice any changes or new issues arising with input, please let us know. </p>",
      pub_date: "2017-08-02T17:33:45.432691Z",
      creator: "Subversity",
    },
    {
      title: "Quoted Synonyms Update",
      body:
        '<p>The annoying "quoted synonyms" are now filtered out in the review. Everybody dance!</p>',
      pub_date: "2017-06-20T19:57:19.596753Z",
      creator: "Subversity",
    },
    {
      title: "Quoted Synonyms",
      body:
        "<p>Recent changes to WK's API now causes (unintentionally!) synonyms containing a space within them to be enclosed with double quotes. This is clearly quite annoying. We are going to wait on WK briefly to see if they will fix this first before we go ahead with our own fix (that we would then have to revert).</p><p>Please bear with us for a few days while we await a response from WK.</p>",
      pub_date: "2017-06-18T11:15:36.483755Z",
      creator: "Subversity",
    },
    {
      title: "Vacation Mode Hijinks",
      body:
        "<p>Vacation Mode was playing up a little bit, letting reviews sneak through when it shouldn't have. This is working properly again now. Take as many vacations as you wish!</p>",
      pub_date: "2017-06-09T09:53:44.243882Z",
      creator: "Subversity",
    },
    {
      title: "HighLevel Users WK Sync (Fixed!)",
      body:
        '<p>Batching sync updates is now working as expected. A few high level users might suddenly have some delayed burned WK items appear. <span lang="ja">ごめんね！</span> Going forward, syncing should run as usual (within ~12 hours of WK changes).</p>',
      pub_date: "2017-03-25T15:30:54.085051Z",
      creator: "Subversity",
    },
    {
      title: "HighLevel Users WK Sync",
      body:
        '<p>There is currently an issue affecting people with ~20 or more levels unlocked on KW. The WK api seems to be choking on requests for vocabulary that exceed a certain size.</p>\r\n<p>Unfortunately this is not something we can change from our end. However we are implementing a fix to query api data in batches to workaround the timeout issue</p>\r\n<p>We have a bug opened for it <a href="https://github.com/Kaniwani/KW-Backend/issues/298" target="_blank" rel="nofollow noreferrer noopener">here</a>, feel free to add your KW username in that ticket if you are a KW user with >20 levels unlocked and your stuff isn\'t properly syncing.</p>',
      pub_date: "2017-03-20T14:10:55.403057Z",
      creator: "Subversity",
    },
    {
      title: "Changes for people with many reviews",
      body:
        "Some users (with large amounts of reviews) were getting an error when trying to visit the review page. This patch breaks reviews down into 300 review chunks. This is just an interim fix, as we have something much larger in the works!\r\n\r\nCheers,",
      pub_date: "2016-12-17T19:00:03.832425Z",
      creator: "Tadgh",
    },
    {
      title: "Syncing New Vocab",
      body:
        "<p>We're having a few problems with syncing new data at the moment, the user base is increasing and adding additional load to the server. We're working on remedying the issue, in the meantime you'll have to wait until it is resolved for newly unlocked items to come across automatically (but you can continue reviewing your present items without issue).</p>\r\n<p>If you are having trouble seeing new items appear, you can navigate to <a href=\"https://kaniwani.com/kw/sync\">kaniwani.com/kw/sync</a> to force a sync outside of the usual schedule. Please refrain from spamming this though!</p>",
      pub_date: "2016-11-07T10:42:40.449654Z",
      creator: "Subversity",
    },
    {
      title: "Stuck Review Item",
      body:
        "<p>We're aware of some users having a single item repeating/remaining at the end of their review. We're attempting to isolate the problem, however we cannot seem to replicate the issue at all.</p>\r\n<p>Please bear with us in the meantime - if you get stuck, you can exit your review and see your current summary by clicking the eject icon at the top left of the review screen.</p>",
      pub_date: "2016-09-24T04:32:01.362144Z",
      creator: "Subversity",
    },
    {
      title: "Minor Updates",
      body:
        '<ul>\r\n<li>You can now ignore incorrect items using the "/" key (along with the previous "i" and "backspace"). This was added for parity with the common WK ignore script that also uses the "/" key.</li>\r\n<li>Users with no unlocked vocab will receive an informative message on the reviews button rather than an infinite loading animation</li>\r\n</ul>',
      pub_date: "2016-09-17T01:39:10.464679Z",
      creator: "Subversity",
    },
    {
      title: "Timing Issues When Ignoring",
      body:
        "<p>There are a few cases where you can mess up the review queue if you're trying to fly through reviews too quickly. Namely, if you ignore an item and then press enter in quick succession to advance (while the auto-advance is occurring as well). We're working on a fix to prevent this (though currently travelling which makes it tricky) - in the meantime, try not to spam multiple actions in a row (bam, boom, esc, enter, enter!). Hit ignore and wait a moment for it to advance by itself!</p>",
      pub_date: "2016-09-12T02:04:36.332708Z",
      creator: "Subversity",
    },
    {
      title: "User Requests",
      body:
        "<ul>\r\n<li>\r\nUser request: show review count in browser tab icon - if you have a kaniwani tab open in your browser the tiny favicon should now show a purple circle with review count (if reviews are ready).\r\n</li>\r\n<li>\r\nUser request: secret shortcut for user Meem0. Don't worry everyone else, you wouldn't want it anyway :D.\r\n</li>\r\n</ul>",
      pub_date: "2016-09-02T08:46:23.611080Z",
      creator: "Subversity",
    },
    {
      title: "Minor Style and Functionality Updates",
      body:
        "<ul>\r\n  <li>Login screen <b>new account</b> link more prominent (moved from top right of window).</li>\r\n  <li>Safari Browser layout bug fixes (vocabulary and review summary page vocab cards).</li>\r\n  <li>Prevent users from submitting multiple ignore answers (e.g. hitting <b>backspace</b> or <b>I</b> several times in a row) while next question is being rotated in.</li>\r\n</ul>",
      pub_date: "2016-08-16T08:48:29.521929Z",
      creator: "Subversity",
    },
    {
      title: "Minor Style and Server Updates",
      body:
        "<ul>\r\n  <li>Overhaul login screen – no more floating turtles.</li>\r\n  <li>Notify level 1 WK users if they have not unlocked any vocabulary yet.</li>\r\n  <li>Various minor styling adjustments.</li>\r\n  <li>Syncing improvements for server stability.</li>\r\n</ul>",
      pub_date: "2016-08-09T01:22:01.387085Z",
      creator: "Subversity",
    },
    {
      title: "Review Countdown Fix",
      body:
        "<ul>\r\n<li>Review countdown timer is back in action.</li>\r\n<li>Newly arrived vocab from WK that are answered incorrectly the first time were appearing instantly for review (since they were considered SRS rank 0 after being incorrect). These items are now delayed 4 hours before coming up for review again.</li>\r\n</ul>",
      pub_date: "2016-07-14T13:38:06.385869Z",
      creator: "Tadgh",
    },
    {
      title: "Minor Bug - Review Countdown",
      body:
        '<p>A few people are experiencing a bug where the Reviews button on the home page won\'t show "Next Review: in x time" and instead shows the loading icon (if there are no reviews ready).</p>\r\n<p>Reviews will still work as usual - you\'ll just have to check back to see if they\'re ready. The "Next Hour" count will give you an idea if anything is coming up soon. Sorry for the inconvenience!</p>',
      pub_date: "2016-07-13T05:08:25.864614Z",
      creator: "Subversity",
    },
    {
      title: "We're still here! (With Changes!)",
      body:
        '<ul>\r\n<li>You can now login with your email!</li>\r\n<li>New logo</li>\r\n<li>Better quiz shortcut handling (you should be able to press keys like "i" while using an IME to ignore answer without having to swap to english input first)</li>\r\n<li>Auto advance is prevented (for a single item) if user moves onto the next question manually</li>\r\n<li>Quiz shows srs rank down notification on incorrect answer</li>\r\n<li>Burning an item no longer permanently colors rank up notification black for the remainder of that quiz session</li>\r\n<li>Upgrades backend Framework to newest</li>\r\n<li>Fixes WK Timing Issue. We now use Identical SRS levels.</li>\r\n</ul>',
      pub_date: "2016-07-07T13:57:04.066224Z",
      creator: "Tadgh",
    },
  ],
};
