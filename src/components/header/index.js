import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";

export async function Header() {
  const auth = await useAuth.fromServer();

  console.log("auth", auth);

  return (
    <header>
      <div>
        <Link href="/">Logo</Link>
      </div>
      <nav>
        {auth ? (
          <Link href="/panel">Panel (Protected Route)</Link>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
