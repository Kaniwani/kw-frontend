import AnnouncementList from 'components/AnnouncementList';
const items = Array.from({ length: 15 }, () => ({
  title: "Welcome to this announcement!",
  body: `
    <div>
      <p>The body can contain html, unsanitized 👻! Since it comes from the server admin area.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia optio veritatis at quae, non necessitatibus tempore     expedita delectus ab sed nobis quo assumenda laboriosam doloremque autem, praesentium odit, nihil accusantium rerum voluptatem numquam maxime animi. Odit eligendi dolore, cum eius illum amet qui dignissimos ipsa. Nulla harum qui, unde sapiente.</p>
    </div>
  `,
  pubDate: new Date(),
}));

export default {
  withCosmosWrapper: true,
  component: AnnouncementList,
  props: {
    items,
  },
};
