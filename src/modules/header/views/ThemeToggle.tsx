import { Button, Tooltip } from 'antd'
import { useTheme } from 'src/providers/ThemeContext.tsx'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <Tooltip title={isDarkMode ? 'თეთრი ფონი' : 'შავი ფონი'}>
      <Button
        onClick={toggleTheme}
        icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
      />
    </Tooltip>
  )
}

export default ThemeToggle
