import clsx from "clsx";
import { GoSignOut } from "react-icons/go";
import { auth, signIn, signOut } from "~/lib/auth";
import Bubble from "./UI/Bubble";

const SignIn = async ({ className }: { className?: string }) => {
  const session = await auth();
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
          <Bubble
            layout={
              <button className="rounded-full overflow-hidden" type="submit">
                <img className="size-10" src={session.user?.image || ""}></img>
              </button>
            }
          >
            <div className="border w-[200px] p-2 flex flex-col">
              <header className="text-[12px]">用户</header>
              <main className="flex my-2 gap-2 items-center">
                <img
                  className="size-8 rounded-full  "
                  src={session.user?.image}
                  alt={session.user?.name}
                />
                <div>
                  <h2 className="font-bold">{session.user?.name}</h2>
                  <span className="text-[12px]">{session.user?.email}</span>
                </div>
              </main>
              <form action={signOutHandler}>
                <button
                  type="submit"
                  className="w-full text-sm font-bold p-2 flex items-center gap-2 hover:bg-slate-400/10"
                >
                  <GoSignOut className="flex items-center" />
                  <span>退出</span>
                </button>
              </form>
            </div>
          </Bubble>
        )}
      </div>
    </>
  );
};
export default SignIn;
