export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);

  // const data = await getBlogList();
  // return Response.json({ data });
}
