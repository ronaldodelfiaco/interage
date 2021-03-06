import Icons from "../../icons/sidebar";

const index = [
  // {
  //   title: "Dashboard",
  //   Icon: Icons.DashboardIcon,
  //   children: [
  //     {
  //       subTitle: "Dashboards",
  //       subCategories: [
  //         { name: "Saas", path: "/dashboard/" },
  //         { name: "Sales", path: "/dashboard/sales" },
  //         {
  //           name: "Project Management",
  //           path: "/dashboard/project-management",
  //         },
  //         {
  //           name: "Project Management V2",
  //           path: "/dashboard/project-management-v2",
  //         },
  //       ],
  //       path: "",
  //     },
  //   ],
  // },
  {
    title: "Pessoas",
    Icon: Icons.PeopleIcon,
    path: "/Pessoas",
  },
  {
    title: "Eventos",
    Icon: Icons.DashboardIcon,
    path: "/Eventos",
  },
  {
    title: "Kanban",
    Icon: Icons.KanbanIcon,
    path: "/TodoList",
  },
  {
    title: "Anamnese",
    Icon: Icons.ProjectIcon,
    path: "/anamnese",
  },
  {
    title: "Reavaliação",
    Icon: Icons.SessionsIcon,
    path: "/reavaliacao",
  },
];

export default index;