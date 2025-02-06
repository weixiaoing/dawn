import { BlogData, Result } from "@/_typs/blog";

export const getBlogList = async ({
  skip,
  limit,
  status = "Published",
}: {
  skip: number;
  limit: number;
  status?: "Published" | "Draft" | "Invisible";
}): Promise<Result<BlogData[]>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/post/findWithPage`,
      {
        body: JSON.stringify({ skip, limit, body: { status } }),
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }
    ).then((res) => res.json());
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return {
      code: 0,
      msg: "获取博客列表失败",
      data: [],
    };
  }
};

export const getPost = async (
  postProps: Partial<BlogData>
): Promise<Result<BlogData[]>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/post/findPost`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postProps),
      }
    ).then((res) => res.json());
    return res;
  } catch (error) {
    console.log(error);
    return {
      code: 0,
      msg: "获取博客列表失败",
      data: [],
    };
  }
};

export const getSummary = async (postId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/summary/find`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId }),
    }).then((res) => res.json());

    return res;
  } catch (error) {
    console.log(error);
    return {
      code: 0,
      msg: "获取摘要失败",
      data: [],
    };
  }
};

export const createSummary = async (postId: string, content: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/summary/create`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, content }),
      }
    ).then((res) => res.json());
    return res;
  } catch (error) {
    console.log(error);
    return {
      code: 0,
      msg: "添加失败",
      data: [],
    };
  }
};

export const getTalksByPage = async ({
  page = 1,
  pageSize = 10,
}: {
  page?: number;
  pageSize?: number;
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/talk/findByPage`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page, pageSize }),
      }
    ).then((res) => res.json());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// const getLocationFromIP = async (ip) => {
//   try {
//     const response = await fetch(`https://ipapi.co/${ip}/json/`);
//     const data = await response.json();
//     return {
//       city: data.city,
//       region: data.region,
//       country: data.country,
//     }; // 返回城市、地区和国家信息
//   } catch (error) {
//     console.error('Error fetching location:', error);
//   }
// };
