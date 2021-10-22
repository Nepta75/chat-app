import React, { useState } from 'react';
import { NextPage } from 'next'
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/router'
import Link from 'next/link'

const Inscription: NextPage = () => {
  type Inputs = {
    nickname: string,
    password: string,
  };
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const router = useRouter()

  const onSubmit: SubmitHandler<Inputs> = async ({ nickname, password }) => {  
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nickname,
        password,
        token: 'xxxx'
      })
    });

    if (req.status === 200 || req.status === 201) {
      const data = await req.json();
      if (data?.id) {
        router.push({
          pathname: '/connexion',
          query: { message: 'Inscription réussi, vous pouvez vous connecter !', success: true }
        })
        return;
      }
      return setErrorMessage("Erreur lors de l'inscription")
    }
    
    if (req.status === 403) {
      setErrorMessage("Le prénom existe déjà, veuillez en choisir un autre !");
      return;
    }
  };

  return (
    <Container className="my-5">
      {errorMessage && (
        <Alert dismissible onClose={() => setErrorMessage(null)} variant="danger">
          {errorMessage}
        </Alert>
      )}
      <h2>Inscription</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Prenom</Form.Label>
          <Form.Control
            aria-label="nickname"
            {...register("nickname",  { required: "Champ requis !" })}
            type="text"
            placeholder="prenom"
            isInvalid={!!errors.nickname}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.nickname?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            aria-label="password"
            {...register("password", { required: "Champ requis !" })}
            type="password"
            placeholder="Mot de passe"
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.password?.message}
          </Form.Control.Feedback>
        </Form.Group>
            
        <Button variant="dark" type="submit" aria-label="registerButton">
          Inscription
        </Button>
        <div>Déjà inscrit ? <Link href="/connexion"><a>connexion</a></Link></div>
      </Form>
    </Container>
  )
}

export default Inscription;
