import { Button, Tooltip } from 'antd'
import { useTheme } from 'src/providers/ThemeContext.tsx'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { useTranslation } from 'src/providers/TranslationProvider.tsx'

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme()
  const { translate } = useTranslation()

  return (
    <Tooltip title={isDarkMode
      ? translate('light_theme', 'თეთრი ფონი')
      : translate('dark_theme', 'შავი ფონი')
    }>
      <Button
        onClick={toggleTheme}
        icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
      />
    </Tooltip>
  )
}

export default ThemeToggle
