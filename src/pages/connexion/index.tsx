import React, { useState, useEffect } from 'react';
import { NextPage } from 'next'
import Link from 'next/link'
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";
import { setUserVar } from '../../apollo/cache';
import { useRouter } from 'next/router'
import { User } from '../../types/user'

const Connexion: NextPage = () => {
  type Inputs = {
    nickName: string,
    password: string,
  };
  const [message, setMessage] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const router = useRouter();

  useEffect(() => {
    if (router?.query?.message && router?.query?.success) {
      setMessage({
        variant: router?.query?.success === 'true' ? 'success' : 'danger',
        message: router?.query?.message || ''
      });
    }
  }, [router.query]);

  const login: SubmitHandler<Inputs> = data => {  
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?nickname=${data.nickName}&password=${data.password}`)
      .then(response => response.json())
      .then((data: User)  => {
        if (data.id) {
          setUserVar(data);
          router.push('/messages')
          return;
        }
        return setMessage({ message: 'Identifiants incorrects !', variant: 'danger' })
      })
  };

  return (
    <Container className="my-5">
      {!!message && (
        <Alert dismissible onClose={() => setMessage(null)} variant={message?.variant}>
          <span aria-label="message">{message?.message}</span>
        </Alert>
      )}
      <h2>Connexion</h2>
      <Form onSubmit={handleSubmit(login)} aria-label='form'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Prenom</Form.Label>
          <Form.Control
            aria-label="prenom"
            {...register("nickName",  { required: "Champ requis !" })}
            type="text"
            placeholder="prenom"
            isInvalid={!!errors.nickName}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.nickName?.message}
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
        <Button aria-label="loginButton" variant="dark" type="submit">
          Connexion
        </Button>
        <div>Pas encore inscrit ? <Link href="/inscription"><a>inscription</a></Link></div>
      </Form>
    </Container>
  )
}

export default Connexion;
