import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '碳智METHAS按钮组件，支持多种变体、大小和状态，具有优雅的动画效果。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'link', 'destructive'],
      description: '按钮变体样式',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'icon'],
      description: '按钮大小',
    },
    loading: {
      control: 'boolean',
      description: '加载状态',
    },
    disabled: {
      control: 'boolean',
      description: '禁用状态',
    },
    children: {
      control: 'text',
      description: '按钮内容',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '主要按钮',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: '次要按钮',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: '轮廓按钮',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: '幽灵按钮',
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
    children: '链接按钮',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: '危险按钮',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: '小按钮',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
    children: '中按钮',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: '大按钮',
  },
}

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: '超大按钮',
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    children: '加载中',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: '禁用按钮',
  },
}

export const WithLeftIcon: Story = {
  args: {
    leftIcon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    children: '添加项目',
  },
}

export const WithRightIcon: Story = {
  args: {
    rightIcon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    ),
    children: '下一步',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">主要按钮</Button>
      <Button variant="secondary">次要按钮</Button>
      <Button variant="outline">轮廓按钮</Button>
      <Button variant="ghost">幽灵按钮</Button>
      <Button variant="link">链接按钮</Button>
      <Button variant="destructive">危险按钮</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">小按钮</Button>
      <Button size="md">中按钮</Button>
      <Button size="lg">大按钮</Button>
      <Button size="xl">超大按钮</Button>
    </div>
  ),
}