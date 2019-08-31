const individualUserColumns = [
  { accessor: "username", Header: "username" },
  { accessor: "Bio", Header: "Bio" },
  { accessor: "Average Comments", Header: "Avg Comments" },
  {
    accessor: "Average Engagement (per post as % of followers)",
    Header: "Avg Engagement (per post as % of followers)"
  },
  { accessor: "Average Engagement per post", Header: "Avg Engagement per post" },
  { accessor: "Average Likes" },
  { accessor: "Average Video Views" },
  { accessor: "Counted posts" },
  { accessor: "Followers" },
  { accessor: "Following" },
  { accessor: "Number of Hashtags" },
  { accessor: "Total Engagement" }
];

export const userColumnns = individualUserColumns.map(obj => ({
  Header: obj.Header || obj.accessor, accessor: obj.accessor
}));
