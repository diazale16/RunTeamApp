import { TouchableOpacity, Text } from 'react-native';

export function Button({ title, onPress, variant = 'primary', disabled, style, textStyle }) {
  const variantClasses = {
    primary: 'bg-blue-600',
    secondary: 'border border-blue-600 bg-white',
    danger: 'bg-red-600',
  };

  const textVariantClasses = {
    primary: 'text-white',
    secondary: 'text-blue-600',
    danger: 'text-white',
  };

  const buttonClasses = [
    'items-center justify-center rounded-lg px-6 py-3',
    variantClasses[variant] || variantClasses.primary,
    disabled && 'opacity-50',
  ]
    .filter(Boolean)
    .join(' ');

  const textClasses = ['text-base font-semibold', textVariantClasses[variant] || textVariantClasses.primary, disabled && 'text-neutral-400']
    .filter(Boolean)
    .join(' ');

  return (
    <TouchableOpacity className={buttonClasses} style={style} onPress={onPress} disabled={disabled} activeOpacity={0.7}>
      <Text className={textClasses} style={textStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}