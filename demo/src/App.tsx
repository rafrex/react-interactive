import React from 'react';
import useDarkMode from 'use-dark-mode';
import { Interactive, InteractiveStateChange } from 'react-interactive';
import { styled, globalStyles, darkThemeClass } from './stitches.config';
import { StyledLink, StyledDarkModeToggle } from './Interactive';

const AppDiv = styled('div', {
  maxWidth: '400px',
  padding: '14px 15px 25px',
  margin: '0 auto',
});

const H1 = styled('h1', {
  fontSize: '26px',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '2px',
});

const P = styled('p', {
  margin: '12px 0',
});

const StateLogContainer = styled('div', {
  height: '300px',
  padding: '0 5px',
  border: '1px solid $highContrast',
  overflow: 'scroll',
});

const StateLogItem = styled('div', {
  marginBottom: '10px',
});

const ItemTitle = styled('div', {
  color: '$lowContrast',
});

const StyledUl = styled('ul', {
  listStyle: 'none',
});

const Li = styled('li', {
  variants: {
    changed: {
      false: { color: '$lowContrast' },
    },
  },
});

const StyledLi: React.VFC<{
  children: string | string[];
  changed: boolean;
}> = ({ children, changed }) => (
  <Li changed={changed}>
    <code>{children}</code>
  </Li>
);

export const App = () => {
  globalStyles();

  const darkMode = useDarkMode(undefined, {
    classNameDark: darkThemeClass,
  });

  const [iStateLog, updateIStateLog] = React.useState<InteractiveStateChange[]>(
    [],
  );

  const eventLogEl = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (eventLogEl && eventLogEl.current) {
      eventLogEl.current.scrollTop = eventLogEl.current.scrollHeight;
    }
  });

  return (
    <AppDiv>
      <H1>
        <span>React Interactive Demo</span>
        <StyledDarkModeToggle onClick={darkMode.toggle} />
      </H1>
      <StyledLink
        type="lowContrast"
        href="https://github.com/rafgraph/react-interactive"
      >
        https://github.com/rafgraph/react-interactive
      </StyledLink>
      <P>
        This demo site for React Interactive v1 is under construction 🚧🚧 the{' '}
        <StyledLink href="https://react-interactive-v0.rafgraph.dev">
          v0 demo site can be found here
        </StyledLink>
        .
      </P>
      <div>
        <Interactive
          onStateChange={(state) => {
            updateIStateLog((prevState) => [...prevState, state]);
          }}
        >
          hover me
        </Interactive>
        <StateLogContainer ref={eventLogEl}>
          {iStateLog.map(({ state, prevState }, idx) => (
            <StateLogItem key={idx}>
              <ItemTitle>State Change {idx + 1}</ItemTitle>
              <StyledUl>
                <StyledLi changed={state.hover !== prevState.hover}>
                  hover: {`${state.hover}`} ({`${prevState.hover}`})
                </StyledLi>
                <StyledLi changed={state.active !== prevState.active}>
                  active: {`${state.active}`} ({`${prevState.active}`})
                </StyledLi>
                <StyledLi changed={state.focus !== prevState.focus}>
                  focus: {`${state.focus}`} ({`${prevState.focus}`})
                </StyledLi>
                <StyledLi changed={state.disabled !== prevState.disabled}>
                  disabled: {`${state.disabled}`} ({`${prevState.disabled}`})
                </StyledLi>
              </StyledUl>
            </StateLogItem>
          ))}
        </StateLogContainer>
      </div>
    </AppDiv>
  );
};
