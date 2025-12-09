import Pagination from "@/app/_components/Pagination";
import PostItem from "@/app/_components/PostItem";
import Filter from "@/app/_components/Filter";
import {
  getDiscussPostCount,
  selectDiscussPosts,
} from "@/app/_lib/DiscussPostMapper";
import Homepage from "@/app/_components/Homepage";

async function page({ params }) {
  let { offset } = await params;

  return <Homepage offset={offset} />;
}

export default page;
