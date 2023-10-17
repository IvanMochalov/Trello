import React from 'react';
import { FormControl } from '@mui/base';
import { OutlinedInput, Tooltip } from '@mui/material';
import styled from 'styled-components';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { TOutletContext, TTask } from '../../type';
import { useOutletContext } from 'react-router';

const Container = styled.div`
  padding: 8px;
  width: 100%;
`

const Form = styled.form`
  position: relative;
`

const Button = styled.button`
  position: absolute;
  border-radius: 100%;
  height: 30px;
  width: 30px;
  display: grid;
  place-items: center;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  padding: 0;
  background: none;
  color: green;

  &:focus-visible {
    outline: none;
    background-color: lightgray;
    color: darkgreen;
  }
`

interface INewStep {
  currTask: TTask
}

export const NewStep = ({ currTask }: INewStep) => {
  const { handlers: { itemSave } } = useOutletContext<TOutletContext>();

  const [stepName, setStepName] = React.useState('');

  const formStepId = React.useId();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStepName(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (stepName === '') {
      return;
    }
    itemSave(stepName.trim(), currTask);
    setStepName('');
  }

  return (
    <Container>
      <Tooltip title="Добавить шаг" placement="top">
        <Form id={formStepId} noValidate autoComplete="off" onSubmit={handleSubmit} >
          <FormControl>
            <OutlinedInput
              value={stepName}
              placeholder="Шаг №1"
              onChange={handleChange}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-input': {
                  padding: '7px',
                  paddingRight: '37px',
                }
              }}
            />
          </FormControl>
          {stepName && (
            <Tooltip title="Create new Step" placement="left-start">
              <Button
                type="submit"
                form={formStepId}
              >
                <ArrowCircleRightOutlinedIcon sx={{cursor: 'pointer'}}/>
              </Button>
            </Tooltip>
          )}
        </Form>
      </Tooltip>
    </Container>
  )
}