"use client"
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import mensajes from "@/app/components/Mensajes";
const validationSchema = object().shape({
  name: string().required("Campo requerido"),
  email: string().email("Correo no válido").required("Correo requerido"),
  password: string().min(6, "Mínimo 6 caracteres").required("Contraseña requerida"),
  rol: string().required("Rol requerido"),
  estado: string().required("Estado requerido"),
});

function UserForm() {
  const router = useRouter();
  const formOptions = {
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const roles = [
    { id: '1', name: 'Admin' },
    { id: '2', name: 'User' }
  ];

  const handleCreateUser = (data) => {
    // Simula la creación de usuario
    console.log("Usuario creado con éxito", data);
    mensajes("Exito", "Usuario registrado exitosamente");
    router.push("/users");
  };

  return (
    <section className="items-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundImage: 'url("c.jpg")', backgroundSize: 'cover' }}>
      <div className="normal-form" style={{ width: '400px', padding: '20px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', textAlign: 'center' }}>
        <form onSubmit={handleSubmit(handleCreateUser)}>
          <h1 className="title-form">Crear Usuario</h1>
          <div className="form-item">
            <label>Nombre</label>
            <input {...register("name")} type="text" />
            {errors.name && <span className="validation-error">{errors.name.message}</span>}
          </div>
          <div className="form-item">
            <label>Correo</label>
            <input {...register("email")} type="email" />
            {errors.email && <span className="validation-error">{errors.email.message}</span>}
          </div>
          <div className="form-item">
            <label>Contraseña</label>
            <input {...register("password")} type="password" />
            {errors.password && <span className="validation-error">{errors.password.message}</span>}
          </div>
          <div className="form-item">
            <label>Rol</label>
            <select {...register("rol")}>
              <option value="" key=""></option>
              {roles.map(rol => (
                <option value={rol.id} key={rol.id}>{rol.name}</option>
              ))}
            </select>
            {errors.rol && <span className="validation-error">{errors.rol.message}</span>}
          </div>
          <div className="form-item">
            <label>Estado</label>
            <select {...register("estado")}>
              <option value="" key=""></option>
              <option value={true} key="ACTIVO">Activo</option>
              <option value={false} key="INACTIVO">Inactivo</option>
            </select>
            {errors.estado && <span className="validation-error">{errors.estado.message}</span>}
          </div>
          <input className="button-primary" type="submit" value="Crear" />
        </form>
      </div>
    </section>
  );
}

export default UserForm;
