import { HomeOutlined } from '@ant-design/icons'
import { Button, Card, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import AccessDeniedImage from '../../../assets/media/logos/access-denied.jpg'
import { useTranslation } from 'src/providers/TranslationProvider.tsx'

const { Title, Text } = Typography

const AccessDenied = () => {
  const navigate = useNavigate()
  const { translate } = useTranslation()

  return (
    <div className='flex flex-col items-center justify-center !min-h-screen bg-cover bg-center bg-no-repeat page-not-found-background'>
      <Card className='w-[800px] p-6 shadow-xl bg-white bg-opacity-80'>
        <Title level={1} className='text-3xl text-gray-900 text-center mb-4'>
          {translate('no_permission_for_this_action', 'თქვენ არ გაქვთ მინიჭებული ნებართვა ამ მოქმედების შესასრულებლად')}!
        </Title>
        <Text className='text-lg text-gray-600 mb-6 block text-center'>
          {translate('check_permissions_to_view_page', 'გთხოვთ გადაამოწმოთ თქვენი უფლებები/როლები ან დაუკაშირდით ადმინისტრაციის ხელმძღვანელს ამ გვერდის სანახავად')}.
        </Text>
        <div className='flex justify-center mb-6'>
          <img
            src={AccessDeniedImage}
            alt='not-found-page-image'
            className='max-w-full max-h-72 object-contain'
          />
        </div>
        <div className='flex justify-center'>
          <Button
            type='primary'
            icon={<HomeOutlined />}
            onClick={() => navigate('/')}
          >
            {translate('go_to_homepage', 'მთავარ გვერდზე დაბრუნება')}
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default AccessDenied
