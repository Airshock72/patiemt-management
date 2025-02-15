import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import NotFoundImage from '../../../assets/media/logos/404-error.png'
import { useTranslation } from 'src/providers/TranslationProvider.tsx'

const { Title, Text } = Typography

const NotFound = () => {
  const navigate = useNavigate()
  const { translate } = useTranslation()

  return (
    <div className='flex flex-col items-center justify-center !min-h-screen bg-cover bg-center bg-no-repeat page-not-found-background'>
      <Card className='w-[800px] p-6 shadow-xl bg-white bg-opacity-80'>
        <Title level={1} className='text-3xl text-gray-900 text-center mb-4'>
          {translate('page_not_found', 'გვერდი ვერ მოიძებნა')}!
        </Title>
        <Text className='text-lg text-gray-600 mb-6 block text-center'>
          {translate('access_page_that_no_exist', 'თქვენ ცდილობთ შეაღწიოთ ისეთ გვერდზე, რომელიც არ არსებობს')}.
        </Text>
        <div className='flex justify-center mb-6'>
          <img
            src={NotFoundImage}
            alt='not-found-page-image'
            className='max-w-full max-h-72 object-contain'
          />
        </div>
        <div className='flex justify-center'>
          <Button
            type='primary'
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          >
            {translate('go_back', 'უკან დაბრუნება')}
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default NotFound
