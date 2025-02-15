import { Button, Checkbox, Form, Input } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useAuth } from 'src/providers/AuthProvider.tsx'
import { Navigate } from 'react-router-dom'
import { LoginFormValue } from 'src/modules/auth/login/types'
import { UserRole } from 'api/auth/types.ts'
import { useTranslation } from 'src/providers/TranslationProvider.tsx'
import { useTheme } from 'src/providers/ThemeContext.tsx'
import { darkThemeStyles, lightThemeStyles } from 'src/modules/auth/login/helpers'

const LoginPage = () => {
  const auth = useAuth()
  const [form] = Form.useForm()
  const { translate } = useTranslation()
  const { isDarkMode } = useTheme()

  const onFinish = (values: LoginFormValue) => auth.signin(values)

  if (localStorage.getItem('userData') !== null) return <Navigate to='/' />

  const pageStyle = isDarkMode ? darkThemeStyles : lightThemeStyles

  return (
    <div className='flex items-center justify-center !min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600'>
      <div className='w-full max-w-md p-8 rounded-lg shadow-2xl' style={pageStyle}>
        <h1 className='text-2xl font-bold text-center mb-6'>{translate('authorization', 'ავტორიზაცია')}</h1>
        <Form form={form} onFinish={onFinish} layout='vertical'>
          <Form.Item
            label={translate('username', 'სახელი')}
            name='username'
            rules={[{ required: true, message: translate('please_enter_name', 'გთხოვთ შეიყვანოთ სახელი') }]}>
            <Input placeholder={translate('enter_your_username', 'შეიყვანეთ თქვენი სახელი')} />
          </Form.Item>
          <Form.Item
            className='!mt-3'
            label={translate('password', 'პაროლი')}
            name='password'
            rules={[{ required: true, message: translate('please_enter_your_password', 'გთხოვთ შეიყვანოთ თქვენი პაროლი') }]}>
            <Input.Password
              placeholder={translate('enter_your_password', 'შეიყვანეთ თქვენი პაროლი')}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item label={translate('login_as', 'შედი სისტემაში როგორც')} className='!mt-3'>
            <Form.Item name='roles' valuePropName='value' noStyle>
              <Checkbox.Group>
                <div className='flex gap-4'>
                  <Checkbox value={UserRole.ADMIN}>{translate('admin', 'ადმინი')}</Checkbox>
                  <Checkbox value={UserRole.DOCTOR}>{translate('doctor', 'ექიმი')}</Checkbox>
                </div>
              </Checkbox.Group>
            </Form.Item>
          </Form.Item>
          <Form.Item className='flex justify-center !mt-15'>
            <Button
              type='primary'
              htmlType='submit'
              className='w-full bg-blue-500 hover:bg-blue-600'>
              {translate('log_in', 'შესვლა')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default LoginPage
