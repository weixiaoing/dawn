import clsx from "clsx";
import { auth, signIn, signOut } from "~/lib/auth";
// export async function UserAvatar() {
//   const session = await auth();
//   console.log(session);
//   if (!session?.user) return null;
//   return (
//     <div>
//       <img src={session.user.image} alt="User Avatar" />
//     </div>
//   );
// }
const SignIn = async ({ className }: { className?: string }) => {
  const session = await auth();
  const status = session ? true : false;
  const signInHandler = async () => {
    "use server";
    await signIn("github");
  };

  const signOutHandler = async () => {
    "use server";
    await signOut();
  };

  return (
    <>
      <div className={clsx("flex items-center", className)}>
        {!session ? (
          <form action={signInHandler}>
            <button type="submit">SigniIn</button>
          </form>
        ) : (
          <form action={signOutHandler}>
            <button type="submit">
              <img className="size-10" src={session.user?.image || ""}></img>
            </button>
          </form>
        )}
      </div>
    </>
  );
};
export default SignIn;
