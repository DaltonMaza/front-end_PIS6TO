"use client";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { useForm } from 'react-hook-form';
import { estaSesion } from '../hooks/SessionUtil';
import { inicio_sesion } from '../hooks/Autenticacion';
import mensajes from '../components/Mensajes';
import Link from "next/link";
import { useRouter } from 'next/navigation';


export default function Login() {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("rol")
    sessionStorage.removeItem("external")
    sessionStorage.removeItem("user")
    //router
    const router = useRouter();
    //validaciones
    const validationShema = Yup.object().shape({
        correo: Yup.string().required('Ingrese el correo electronico'),
        clave: Yup.string().required('ingrese su clave')
    });

    const formOptions = { resolver: yupResolver(validationShema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const sendData = (data) => {
        //console.log(data);
        var data = { "correo": data.correo, "clave": data.clave};
        //console.log("esto es el external:  ",data.external)


        inicio_sesion(data).then((info) => {
            if (!estaSesion()) {

                mensajes("Error en inicio de sesion", "Datos incorrectos", "error")
            } else {
                //console.log(info);
                mensajes("Has Ingresado al Sistema", "Bienvenido Usuario", "success")
                console.log(info.data);
                router.push("/principal");
                window.location.reload();
            }
        })
    }

  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <header style={{ position: 'fixed', top: 0, right: 0, left: 0, zIndex: 1030 }}></header>
      <div className="container mx-auto">
        <div className="text-center mb-4">
          <h1 style={{ color: '#205375' }}>Inicio Sesion</h1>
        </div>
        <div className="d-flex justify-content-center">
          <div className="card bg-glass mx-auto" style={{ border: '8px solid rgba(27, 79, 114, 0.5)', width: '100%', maxWidth: '600px' }}>
            <div className="card-body px-5 py-5">
              <div className="text-center mb-4">
                <Image src="/icono.png" width={240} height={240} alt="logo" />
              </div>
              <form onSubmit={handleSubmit(sendData)}>
                <div className="form-outline mb-4">
                  <input
                    {...register('correo')}
                    name="correo"
                    id="correo"
                    className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                    placeholder='Ingresar correo'
                    style={{ fontSize: '20px' }}
                  />
                  <label className="form-label" style={{ color: '#205375', fontSize: '18px' }}>Usuario</label>
                  <div className='alert alert-danger invalid-feedback'>{errors.correo?.message}</div>
                </div>

                <div className="form-outline mb-4">
                  <input
                    {...register('clave')}
                    type="password"
                    name="clave"
                    id="clave"
                    className={`form-control ${errors.clave ? 'is-invalid' : ''}`}
                    placeholder='Ingresar clave'
                    style={{ fontSize: '20px' }}
                  />
                  <label className="form-label" style={{ color: '#205375', fontSize: '18px' }}>Clave</label>
                  <div className='alert alert-danger invalid-feedback'>{errors.clave?.message}</div>
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4" style={{ background: '#1b4f72', fontSize: '20px' }}>
                  INICIAR SESIÓN
                </button>
              </form>
              <p><a class="link-opacity-10-hover" href="/contra">¿Has olvidado la contraseña?</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
