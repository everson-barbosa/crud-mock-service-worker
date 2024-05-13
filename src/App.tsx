import { Theme } from '@radix-ui/themes';
import { ReactNode } from 'react';

interface AppProps {
  children: ReactNode
}

function App({ children }: AppProps) {
  return (
    <Theme appearance="dark">
      {children}
    </Theme>    
  )
}

export default App
