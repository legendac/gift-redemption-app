// Form.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import Form from "../../components/Form";

test('render form with basic form elements', async () => {
  render(<Form />);
  const staffPassIdLabel = screen.getByTestId('staff_pass_id_label')
  expect(staffPassIdLabel).toBeInTheDocument();
  expect(staffPassIdLabel).toHaveTextContent(/staff pass id/i);

  expect(screen.getByTestId('staff_pass_id')).toBeInTheDocument();

  const teamNameLabel = screen.getByTestId('team_name_label')
  expect(teamNameLabel).toBeInTheDocument();
  expect(teamNameLabel).toHaveTextContent(/team name/i);

  expect(screen.getByTestId('team_name-Gryffindor')).toBeInTheDocument();
  expect(screen.getByTestId('team_name-Hufflepuff')).toBeInTheDocument();
  expect(screen.getByTestId('team_name-Ravenclaw')).toBeInTheDocument();
  expect(screen.getByTestId('team_name-Slytherin')).toBeInTheDocument();

  const button = screen.getByTestId('redeem_button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent(/redeem/i);
});
