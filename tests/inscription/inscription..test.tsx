import {render, fireEvent, screen, waitFor } from '@testing-library/react'
import Inscription from "../../src/pages/inscription/index";

const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter() {
      return {
          route: "/inscription",
          pathname: "/inscription",
          asPath: "",
          push: mockPush
      };
  },
}));

const setup = () => {
  const utils = render(<Inscription />)
  const passwordInput = utils.getByLabelText('password')
  const nicknameInput = utils.getByLabelText('nickname')
  return {
    passwordInput,
    nicknameInput,
    ...utils,
  }
}

describe('inscription page', () => {
  test('Should call router.push function after fetched user', async () => {
    global.fetch = jest.fn(() => 
      Promise.resolve({
        status: 201,
        json: () => Promise.resolve({ id: 1 }),
      }),
    ) as jest.Mock;

    const {passwordInput, nicknameInput} = setup()
    fireEvent.change(passwordInput, {target: {value: '123'}})
    fireEvent.change(nicknameInput, {target: {value: 'Thibaut'}})
    fireEvent.click(screen.getByLabelText(/registerButton/i))
    await waitFor(() => {
      expect(mockPush).toBeCalledWith({
        pathname: '/connexion',
        query: {
          message: 'Inscription réussi, vous pouvez vous connecter !',
          success: true
        }
      })
    }, { timeout: 3000 })
  });

  test('Should return error when user already exist', async () => {
    global.fetch = jest.fn(() => 
      Promise.resolve({
        status: 403,
        json: () => Promise.resolve({}),
      }),
    ) as jest.Mock;

    const {passwordInput, nicknameInput, findByText} = setup()
    fireEvent.change(passwordInput, {target: {value: '123'}})
    fireEvent.change(nicknameInput, {target: {value: 'Thibaut'}})
    fireEvent.click(screen.getByLabelText(/registerButton/i))
    expect(await findByText("Le prénom existe déjà, veuillez en choisir un autre !")).not.toBeDisabled()
  });
  
  test('should display correct error message', async () => {
    const {passwordInput, nicknameInput, findByText} = setup()
    fireEvent.change(passwordInput, {target: {value: '123'}})
    fireEvent.change(nicknameInput, {target: {value: ''}})
    fireEvent.click(screen.getByLabelText(/registerButton/i))
    expect(await findByText("Champ requis !")).not.toBeDisabled()
  })
})
