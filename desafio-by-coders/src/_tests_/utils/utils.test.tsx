import { render } from '@testing-library/react';
import { prettifyCpf, Redirect } from "../../utils";

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

describe("Utils Functions", () => {
  test("Mock Router Redirect", () => {
    render(<Redirect to={'test'} />)
  });

  test("CPF prettier, should return a formatted CPF", () => {
    const formattedCpf = prettifyCpf("99999999999");
    expect(formattedCpf).toBe("999.999.999-99");
  });


});
