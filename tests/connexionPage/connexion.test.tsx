import {render, fireEvent, screen, waitFor } from '@testing-library/react'
import Connexion from "../../src/pages/connexion/index";

const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter() {
      return {
          route: "/connexion",
          pathname: "/connexion",
          query: {},
          asPath: "",
          push: mockPush
      };
  },
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ id: 1 }),
  }),
) as jest.Mock;

const setup = () => {
  const utils = render(<Connexion />)
  const passwordInput = utils.getByLabelText('password')
  const nicknameInput = utils.getByLabelText('prenom')
  const loginButton = utils.getByLabelText('loginButton')
  return {
    passwordInput,
    nicknameInput,
    loginButton,
    ...utils,
  }
}

describe('connexion page', () => {
  test('Should call router.push function after fetched user', async () => {
    const {passwordInput, nicknameInput} = setup()
    fireEvent.change(passwordInput, {target: {value: '123'}})
    fireEvent.change(nicknameInput, {target: {value: 'Thibaut'}})
    fireEvent.click(screen.getByLabelText(/loginButton/i))
    await waitFor(() => {
      expect(mockPush).toBeCalledWith('/messages')
    }, { timeout: 3000 })
  });
  
  test('should display correct error message', async () => {
    const {passwordInput, nicknameInput, findByText} = setup()
    fireEvent.change(passwordInput, {target: {value: '123'}})
    fireEvent.change(nicknameInput, {target: {value: ''}})
    fireEvent.click(screen.getByLabelText(/loginButton/i))
    expect(await findByText("Champ requis !")).not.toBeDisabled()
  })
})
