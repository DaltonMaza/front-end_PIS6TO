"use client";
import Link from "next/link";
import mensajes from "./Mensajes";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function NavBar() {
  const { token, logoutUser } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logoutUser()
    mensajes("Gracias", "Hasta la proxima");
    router.push('/principal');
    router.refresh();
  }

  return (
    <nav className="navbar">
      <div>
        <ul>
          <li>
            <Link href={"/principal"}>
              Inicio
            </Link>
          </li>
          <li>
            <Link href={"/placas"}>
              Placas
            </Link>
          </li>
          {/* <li>
            <Link href={"/sensor"}>
              Sensores
            </Link>
          </li>
          <li>
            <Link href={"/history"}>
              Historial
            </Link>
          </li>
          <li>
            <Link href={"/pronosticos"}>
              Pronóstico
            </Link>
          </li> */}
          {token &&
            <li>
              <Link href={"/perfil"}>
                Perfil
              </Link>
            </li>
          }
          {token &&
            <li>
              <Link href={"/crear_usuario"}>
                Nuevo usuario
              </Link>
            </li>
          }
        </ul>
      </div>
      {token ? (
        <button type="button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      ) : (
        <Link href="/login">
          <button type="button">
            Iniciar sesión
          </button>
        </Link>
      )}
    </nav>
  );
}