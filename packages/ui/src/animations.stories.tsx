import type { Meta, StoryObj } from '@storybook/react'
import { 
  Animated, 
  ScrollAnimated, 
  Interactive, 
  Staggered, 
  LoadingSpinner,
  methasAnimations 
} from './animations'

const meta: Meta = {
  title: 'System/Animations',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '碳智METHAS动画系统，提供统一的动画效果和交互体验。',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const BasicAnimations: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">基础动画</h3>
        <div className="grid grid-cols-2 gap-4">
          <Animated variant="fadeIn">
            <div className="p-4 bg-blue-100 rounded-lg">淡入动画</div>
          </Animated>
          <Animated variant="slideUp">
            <div className="p-4 bg-green-100 rounded-lg">向上滑动</div>
          </Animated>
          <Animated variant="slideDown">
            <div className="p-4 bg-yellow-100 rounded-lg">向下滑动</div>
          </Animated>
          <Animated variant="scaleIn">
            <div className="p-4 bg-purple-100 rounded-lg">缩放进入</div>
          </Animated>
        </div>
      </div>
    </div>
  ),
}

export const InteractiveAnimations: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">交互动画</h3>
        <div className="grid grid-cols-3 gap-4">
          <Interactive hover tap>
            <div className="p-6 bg-primary-100 rounded-lg cursor-pointer text-center">
              悬停和点击
            </div>
          </Interactive>
          <Interactive hover={false} tap>
            <div className="p-6 bg-green-100 rounded-lg cursor-pointer text-center">
              仅点击
            </div>
          </Interactive>
          <Interactive hover tap={false}>
            <div className="p-6 bg-orange-100 rounded-lg cursor-pointer text-center">
              仅悬停
            </div>
          </Interactive>
        </div>
      </div>
    </div>
  ),
}

export const StaggeredAnimations: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">顺序动画</h3>
        <Staggered variant="slideUp" stagger={0.1}>
          <div className="p-4 bg-blue-100 rounded-lg mb-2">第一个元素</div>
          <div className="p-4 bg-green-100 rounded-lg mb-2">第二个元素</div>
          <div className="p-4 bg-yellow-100 rounded-lg mb-2">第三个元素</div>
          <div className="p-4 bg-purple-100 rounded-lg mb-2">第四个元素</div>
        </Staggered>
      </div>
    </div>
  ),
}

export const LoadingSpinners: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">加载动画</h3>
        <div className="flex items-center gap-8">
          <div className="text-center">
            <LoadingSpinner size="sm" />
            <p className="mt-2 text-sm">小尺寸</p>
          </div>
          <div className="text-center">
            <LoadingSpinner size="md" />
            <p className="mt-2 text-sm">中尺寸</p>
          </div>
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-2 text-sm">大尺寸</p>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const AnimationVariants: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">所有动画变体</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(methasAnimations.variants).map((variant) => (
            <Animated key={variant} variant={variant as any} delay={0.1}>
              <div className="p-4 bg-gray-100 rounded-lg text-center">
                {variant}
              </div>
            </Animated>
          ))}
        </div>
      </div>
    </div>
  ),
}

export const AnimationConfiguration: StoryObj = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">动画配置</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm">
{`// 动画持续时间
fast: ${methasAnimations.duration.fast}s
normal: ${methasAnimations.duration.normal}s
slow: ${methasAnimations.duration.slow}s

// 缓动函数
out: cubic-bezier(0.4, 0, 0.2, 1)
inOut: cubic-bezier(0.16, 1, 0.3, 1)
in: cubic-bezier(0.4, 0, 1, 1)
spring: { stiffness: 400, damping: 17 }`}
          </pre>
        </div>
      </div>
    </div>
  ),
}