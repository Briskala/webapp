import React from 'react'

interface LexicalTextNode {
  type: 'text'
  text: string
  format?: number
  mode?: string
  style?: string
  detail?: number
}

interface LexicalElementNode {
  type: string
  tag?: string
  listType?: 'bullet' | 'number'
  children?: LexicalNode[]
  fields?: {
    url?: string
    newTab?: boolean
    linkType?: string
  }
}

type LexicalNode = LexicalTextNode | LexicalElementNode

interface RichTextProps {
  content?: {
    root?: {
      children?: LexicalNode[]
    }
  } | any
}

// Lexical Text formats
const IS_BOLD = 1
const IS_ITALIC = 2
const IS_UNDERLINE = 8
const IS_STRIKETHROUGH = 16

export function RichText({ content }: RichTextProps) {
  if (!content || !content.root || !content.root.children) {
    // If it's a string, just render it as a fallback paragraph
    if (typeof content === 'string') {
      return <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.7', margin: '0 0 16px 0' }}>{content}</p>
    }
    return null
  }

  const renderTextNode = (node: LexicalTextNode, idx: number) => {
    let textElement: React.ReactNode = node.text || ''

    if (!textElement) return null

    const format = node.format || 0

    if (format & IS_BOLD) {
      textElement = <strong key={idx}>{textElement}</strong>
    }
    if (format & IS_ITALIC) {
      textElement = <em key={idx}>{textElement}</em>
    }
    if (format & IS_UNDERLINE) {
      textElement = <u key={idx}>{textElement}</u>
    }
    if (format & IS_STRIKETHROUGH) {
      textElement = <span key={idx} style={{ textDecoration: 'line-through' }}>{textElement}</span>
    }

    return <React.Fragment key={idx}>{textElement}</React.Fragment>
  }

  const renderElementNode = (node: LexicalElementNode, idx: number): React.ReactNode => {
    const children = node.children ? node.children.map((child, cIdx) => renderNode(child, cIdx)) : null

    switch (node.type) {
      case 'paragraph':
        return (
          <p key={idx} style={{ color: '#475569', fontSize: '14px', lineHeight: '1.75', margin: '0 0 16px 0' }}>
            {children}
          </p>
        )
      case 'heading': {
        const Tag = (node.tag || 'h2') as keyof React.JSX.IntrinsicElements
        const fontSize = 
          node.tag === 'h1' ? '28px' : 
          node.tag === 'h2' ? '22px' : 
          node.tag === 'h3' ? '18px' : '15px'
        
        return (
          <Tag 
            key={idx} 
            style={{ 
              fontSize, 
              fontWeight: 700, 
              color: '#1a3a5c', 
              margin: '28px 0 14px 0',
              fontFamily: "'Open Sans', sans-serif" 
            }}
          >
            {children}
          </Tag>
        )
      }
      case 'list': {
        const ListTag = node.listType === 'number' ? 'ol' : 'ul'
        return (
          <ListTag 
            key={idx} 
            style={{ 
              paddingLeft: '24px', 
              margin: '0 0 16px 0', 
              color: '#475569', 
              fontSize: '14px',
              lineHeight: '1.7'
            }}
          >
            {children}
          </ListTag>
        )
      }
      case 'listitem':
        return (
          <li key={idx} style={{ margin: '0 0 6px 0' }}>
            {children}
          </li>
        )
      case 'quote':
        return (
          <blockquote 
            key={idx} 
            style={{ 
              borderLeft: '4px solid #1a5276', 
              paddingLeft: '16px', 
              margin: '20px 0', 
              color: '#64748b', 
              fontStyle: 'italic' 
            }}
          >
            {children}
          </blockquote>
        )
      case 'link':
        return (
          <a 
            key={idx} 
            href={node.fields?.url || '#'} 
            target={node.fields?.newTab ? '_blank' : undefined}
            rel={node.fields?.newTab ? 'noopener noreferrer' : undefined}
            style={{ color: '#2471a3', textDecoration: 'underline', fontWeight: 600 }}
          >
            {children}
          </a>
        )
      default:
        return <div key={idx}>{children}</div>
    }
  }

  const renderNode = (node: LexicalNode, idx: number): React.ReactNode => {
    if (node.type === 'text') {
      return renderTextNode(node as LexicalTextNode, idx)
    } else {
      return renderElementNode(node as LexicalElementNode, idx)
    }
  }

  return (
    <div className="rich-text-content">
      {content.root.children.map((child: LexicalNode, idx: number) => renderNode(child, idx))}
    </div>
  )
}
