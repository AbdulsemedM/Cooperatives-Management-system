export const sidebarConfig = {
  bankAdmin: [
    {
      id: 29,
      label: "Users",
      path: "/bankAdmin/users",
      items: [
        {
          label: "Add User",
          path: "/bankAdmin/createUser",
          icon: <i className="user icon"></i>,
        },
        {
          label: "All Users",
          path: "/bankAdmin/ ",
          icon: <i className="users icon"></i>,
        },
      ],
      icon: <i className="users icon"></i>,
    },
    // {
    //   id: 3,
    //   label: "Industry",
    //   path: "/bankAdmin/industry",
    //   icon: <i className="dashboard icon"></i>,
    // },
    {
      id: 5,
      label: "Settings",
      path: "/bankAdmin/settings",
      icon: <i className="setting icon"></i>,
    },
  ],
  bankReportViewer: [
    {
      id: 1,
      label: "Dashboard",
      path: "/bankReportViewer/",
      icon: <i className="dashboard icon"></i>,
    },
    {
      id: 4,
      label: "Unions",
      path: "/bankReportViewer/unions",
      icon: <i className="dashboard icon"></i>,
    },
    {
      id: 5,
      label: "Pr-Cooperatives",
      path: "/bankReportViewer/prcooperativelist",
      icon: <i className="users icon"></i>,
    },
    {
      id: 2,
      label: "All Users",
      path: "/bankReportViewer/allUsers",
      icon: <i className="users icon"></i>,
    },
    {
      id: 3,
      label: "Federation",
      path: "/bankReportViewer/federation",
      icon: <i className="users icon"></i>,
    },

    {
      id: 6,
      label: "Establishment",
      path: "/bankReportViewer/establishment",
      icon: <i className="users icon"></i>,
    },
    {
      id: 7,
      label: "Members",
      path: "/bankReportViewer/members",
      icon: <i className="balance scale icon"></i>,
    },
    {
      id: 8,
      label: "Business",
      path: "/bankReportViewer/business",
      icon: <i className="balance scale icon"></i>,
    },
    {
      id: 9,
      label: "Finance",
      path: "/bankReportViewer/finance",
      icon: <i className="balance scale icon"></i>,
      items: [
        {
          label: "Balance Sheet",
          path: "/bankReportViewer/sheet",
          icon: <i className="balance scale icon"></i>,
        },
        {
          label: "Income Statement",
          path: "/bankReportViewer/incomestatement",
          icon: <i className="dollar icon"></i>,
        },
        {
          label: "Credit to Member",
          path: "/bankReportViewer/credittomember",
          icon: <i className="chart line icon"></i>,
        },
        {
          label: "Turnover (Sell)",
          path: "/bankReportViewer/sellandturnover",
          icon: <i className="chart line icon"></i>,
        },
      ],
    },
    {
      id: 10,
      label: "With CoopBank",
      path: "/bankReportViewer/withcoopbank",
      icon: <i className="users icon"></i>,
    },
    {
      id: 11,
      label: "Reports",
      path: "/bankReportViewer/reports",
      icon: <i className="chart pie icon"></i>,
    },
  ],
  bankUser: [
    {
      id: 4,
      label: "Unions",
      path: "/bankUser/unions",
      items: [
        {
          label: "Add Union",
          path: "/bankUser/addUnion",
          icon: <i className="chart line icon"></i>,
        },
        {
          label: "List of Unions",
          path: "/bankUser/",
          icon: <i className="chart line icon"></i>,
        },
      ],
      icon: <i className="dashboard icon"></i>,
    },
    {
      id: 5,
      label: "Pr-Cooperatives",
      path: "/bankUser/prcooperativelist",
      icon: <i className="users icon"></i>,
      items: [
        {
          label: "Add PC",
          path: "/bankUser/addPC",
          icon: <i className="chart line icon"></i>,
        },
        {
          label: "List of PC",
          path: "/bankUser/prcooperativelist",
          icon: <i className="chart line icon"></i>,
        },
      ],
    },

    {
      id: 7,
      label: "Members",
      path: "/bankUser/members",
      icon: <i className="balance scale icon"></i>,
    },
    {
      id: 3,
      label: "Federation",
      path: "/bankUser/federation",
      icon: <i className="users icon"></i>,
    },
    {
      id: 8,
      label: "Business",
      path: "/bankUser/business",
      icon: <i className="balance scale icon"></i>,
    },
    {
      id: 9,
      label: "Finance",
      path: "/bankUser/finance",
      icon: <i className="balance scale icon"></i>,
      items: [
        {
          label: "Balance Sheet",
          path: "/bankUser/sheet",
          icon: <i className="balance scale icon"></i>,
        },
        {
          label: "Income Statement",
          path: "/bankUser/incomestatement",
          icon: <i className="dollar icon"></i>,
        },
        {
          label: "Credit to Member",
          path: "/bankUser/credittomember",
          icon: <i className="chart line icon"></i>,
        },
        {
          label: "Turnover (Sell)",
          path: "/bankUser/sellandturnover",
          icon: <i className="chart line icon"></i>,
        },
      ],
    },
    {
      id: 10,
      label: "With CoopBank",
      path: "/bankUser/withcoopbank",
      icon: <i className="users icon"></i>,
    },
  ],
  primaryCooperativeAdmin: [
    {
      id: 29,
      label: "Users",
      path: "/primaryCooperativeAdmin",
      icon: <i className="users icon"></i>,
      items: [
        {
          label: "Add User",
          path: "/primaryCooperativeAdmin",
          icon: <i className="user icon"></i>,
        },
        {
          label: "All Users",
          path: "/primaryCooperativeAdmin/allUsers",
          icon: <i className="users icon"></i>,
        },
      ],
    },
    {
      id: 5,
      label: "Settings",
      path: "/primaryCooperativeAdmin/settings",
      icon: <i className="setting icon"></i>,
    },
  ],
  primaryCooperativeReportViewer: [
    {
      id: 1,
      label: "Dashboard",
      path: "/primaryCooperativeReportViewer/",
      icon: <i className="dashboard icon"></i>,
    },
    {
      id: 2,
      label: "All Users",
      path: "/primaryCooperativeReportViewer/allUsers",
      icon: <i className="users icon"></i>,
    },
    {
      id: 7,
      label: "Members",
      path: "/primaryCooperativeReportViewer/members",
      icon: <i className="balance scale icon"></i>,
    },
    {
      id: 9,
      label: "Finance",
      path: "/primaryCooperativeReportViewer/finance",
      icon: <i className="balance scale icon"></i>,
      items: [
        {
          label: "Balance Sheet",
          path: "/primaryCooperativeReportViewer/sheet",
          icon: <i className="balance scale icon"></i>,
        },
        {
          label: "Turnover (Sell)",
          path: "/primaryCooperativeReportViewer/sellandturnover",
          icon: <i className="chart line icon"></i>,
        },
      ],
    },
    {
      id: 10,
      label: "With CoopBank",
      path: "/primaryCooperativeReportViewer/withcoopbank",
      icon: <i className="users icon"></i>,
    },
    {
      id: 11,
      label: "Reports",
      path: "/primaryCooperativeReportViewer/reports",
      icon: <i className="chart pie icon"></i>,
    },
  ],
  primaryCooperativeUser: [
    {
      id: 7,
      label: "Members",
      path: "/primaryCooperativeUser/",
      icon: <i className="balance scale icon"></i>,
    },
    {
      id: 9,
      label: "Finance",
      path: "/primaryCooperativeUser/finance",
      icon: <i className="balance scale icon"></i>,
      items: [
        {
          label: "Balance Sheet",
          path: "/primaryCooperativeUser/sheet",
          icon: <i className="balance scale icon"></i>,
        },
        // {
        //   label: "Income Statement",
        //   path: "/primaryCooperativeUser/incomestatement",
        //   icon: <i className="dollar icon"></i>,
        // },
        // {
        //   label: "Credit to Member",
        //   path: "/primaryCooperativeUser/credittomember",
        //   icon: <i className="chart line icon"></i>,
        // },
        {
          label: "Turnover (Sell)",
          path: "/primaryCooperativeUser/sellandturnover",
          icon: <i className="chart line icon"></i>,
        },
      ],
    },
    {
      id: 10,
      label: "With CoopBank",
      path: "/primaryCooperativeUser/withcoopbank",
      icon: <i className="users icon"></i>,
    },
  ],
  unionAdmin: [
    {
      id: 29,
      label: "Users",
      path: "/unionAdmin",
      icon: <i className="users icon"></i>,
      items: [
        {
          label: "Add User",
          path: "/unionAdmin",
          icon: <i className="user icon"></i>,
        },
        {
          label: "All Users",
          path: "/unionAdmin/allUsers",
          icon: <i className="users icon"></i>,
        },
      ],
    },
    {
      id: 5,
      label: "Settings",
      path: "/unionAdmin/settings",
      icon: <i className="setting icon"></i>,
    },
  ],
  unionReportViewer: [
    {
      id: 1,
      label: "Dashboard",
      path: "/unionReportViewer/",
      icon: <i className="dashboard icon"></i>,
    },
    {
      id: 5,
      label: "Pr-Cooperatives",
      path: "/unionReportViewer/prcooperativelist",
      icon: <i className="users icon"></i>,
    },
    {
      id: 2,
      label: "All Users",
      path: "/unionReportViewer/allUsers",
      icon: <i className="users icon"></i>,
    },
    {
      id: 7,
      label: "Members",
      path: "/unionReportViewer/members",
      icon: <i className="balance scale icon"></i>,
    },
    {
      id: 9,
      label: "Finance",
      path: "/unionReportViewer/finance",
      icon: <i className="balance scale icon"></i>,
      items: [
        {
          label: "Balance Sheet",
          path: "/unionReportViewer/sheet",
          icon: <i className="balance scale icon"></i>,
        },
        {
          label: "Turnover (Sell)",
          path: "/unionReportViewer/sellandturnover",
          icon: <i className="chart line icon"></i>,
        },
      ],
    },
    {
      id: 10,
      label: "With CoopBank",
      path: "/unionReportViewer/withcoopbank",
      icon: <i className="users icon"></i>,
    },
    {
      id: 11,
      label: "Reports",
      path: "/unionReportViewer/reports",
      icon: <i className="chart pie icon"></i>,
    },
  ],
  unionUser: [
    {
      id: 5,
      label: "Pr-Cooperatives",
      path: "/unionUser/addPC",
      icon: <i className="users icon"></i>,
      items: [
        {
          label: "Add PC",
          path: "/unionUser/addPC",
          icon: <i className="chart line icon"></i>,
        },
        {
          label: "List of PC",
          path: "/unionUser/",
          icon: <i className="chart line icon"></i>,
        },
      ],
    },

    {
      id: 7,
      label: "Members",
      path: "/unionUser/members",
      icon: <i className="balance scale icon"></i>,
    },
    {
      id: 9,
      label: "Finance",
      path: "/unionUser/finance",
      icon: <i className="balance scale icon"></i>,
      items: [
        {
          label: "Balance Sheet",
          path: "/unionUser/sheet",
          icon: <i className="balance scale icon"></i>,
        },
        // {
        //   label: "Income Statement",
        //   path: "/unionUser/incomestatement",
        //   icon: <i className="dollar icon"></i>,
        // },
        // {
        //   label: "Credit to Member",
        //   path: "/unionUser/credittomember",
        //   icon: <i className="chart line icon"></i>,
        // },
        {
          label: "Turnover (Sell)",
          path: "/unionUser/sellandturnover",
          icon: <i className="chart line icon"></i>,
        },
      ],
    },
    {
      id: 10,
      label: "With CoopBank",
      path: "/unionUser/withcoopbank",
      icon: <i className="users icon"></i>,
    },
  ],
};
