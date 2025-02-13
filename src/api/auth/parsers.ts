import { LoginFormValue } from 'src/modules/auth/login/types'
import { TokenData, UserRole } from 'api/auth/types.ts'

export const parseAuth = (response: LoginFormValue): TokenData => {
  const adjectives = [
    'Bright',
    'Healthy',
    'Caring',
    'Advanced',
    'Nurturing',
    'Serene',
    'Happy',
    'Vital',
    'Wellness'
  ]
  const nouns = [
    'Care',
    'Clinic',
    'Center',
    'Medical',
    'Health',
    'Practice',
    'Solutions',
    'Services',
    'Healing'
  ]

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]

  const randomString = Math.random().toString(36).substring(2, 18) // Random string with a length of 16 characters
  const timestamp = Date.now().toString(36) // Timestamp in base 36

  return {
    data: {
      accessToken: `${randomString}-${timestamp}`,
      refreshToken: `${randomString}-${timestamp}`,
      username: response.username,
      id: Date.now() + '-' + Math.floor(Math.random() * 10000),
      roles: response.roles,
      avatar: response.roles === undefined
        ? 'https://robohash.org/stefan-one'
        : response.roles.includes(UserRole.DOCTOR)
          ? 'https://as2.ftcdn.net/v2/jpg/01/34/29/31/1000_F_134293169_ymHT6Lufl0i94WzyE0NNMyDkiMCH9HWx.jpg'
          : 'https://a0.anyrgb.com/pngimg/808/1316/system-administrator-login-installation-avatar-user-wiki-silhouette-neck-human-behavior-icons.png',
      clinicName: response.roles === undefined || response.roles.length === 0
        ? ''
        : response.roles.includes(UserRole.DOCTOR)
          ? randomAdjective + ' ' + randomNoun : ''
    }
  }
}
