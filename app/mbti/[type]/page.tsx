"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, Download, Eye, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

// MBTI类型信息
const mbtiInfo: Record<string, { name: string; description: string; traits: string[]; color: string }> = {
  intj: {
    name: "建筑师",
    description: "富有想象力和战略性的思想家",
    traits: ["独立", "理性", "完美主义"],
    color: "bg-purple-100 text-purple-800",
  },
  intp: {
    name: "逻辑学家",
    description: "具有创造性的思想家",
    traits: ["好奇", "理论", "灵活"],
    color: "bg-blue-100 text-blue-800",
  },
  entj: {
    name: "指挥官",
    description: "大胆、富有想象力的强势领导者",
    traits: ["领导", "决断", "高效"],
    color: "bg-red-100 text-red-800",
  },
  entp: {
    name: "辩论家",
    description: "聪明好奇的思想家",
    traits: ["创新", "热情", "机智"],
    color: "bg-orange-100 text-orange-800",
  },
  infj: {
    name: "提倡者",
    description: "安静而神秘的理想主义者",
    traits: ["理想", "洞察", "坚定"],
    color: "bg-green-100 text-green-800",
  },
  infp: {
    name: "调停者",
    description: "诗意、善良的利他主义者",
    traits: ["善良", "创意", "真诚"],
    color: "bg-teal-100 text-teal-800",
  },
  enfj: {
    name: "主人公",
    description: "富有魅力的鼓舞人心的领导者",
    traits: ["魅力", "同理心", "鼓舞"],
    color: "bg-pink-100 text-pink-800",
  },
  enfp: {
    name: "竞选者",
    description: "热情、有创造力的自由精神",
    traits: ["热情", "创造", "自由"],
    color: "bg-yellow-100 text-yellow-800",
  },
  istj: {
    name: "物流师",
    description: "实用主义的事实导向者",
    traits: ["可靠", "实用", "有序"],
    color: "bg-gray-100 text-gray-800",
  },
  isfj: {
    name: "守护者",
    description: "非常专注、温暖的守护者",
    traits: ["温暖", "负责", "细心"],
    color: "bg-rose-100 text-rose-800",
  },
  estj: {
    name: "总经理",
    description: "出色的管理者",
    traits: ["组织", "传统", "负责"],
    color: "bg-indigo-100 text-indigo-800",
  },
  esfj: {
    name: "执政官",
    description: "极有同情心、受欢迎的人",
    traits: ["和谐", "支持", "合作"],
    color: "bg-emerald-100 text-emerald-800",
  },
  istp: {
    name: "鉴赏家",
    description: "大胆而实际的实验者",
    traits: ["实用", "灵活", "冷静"],
    color: "bg-slate-100 text-slate-800",
  },
  isfp: {
    name: "探险家",
    description: "灵活、有魅力的艺术家",
    traits: ["艺术", "温和", "适应"],
    color: "bg-violet-100 text-violet-800",
  },
  estp: {
    name: "企业家",
    description: "聪明、精力充沛的感知者",
    traits: ["行动", "适应", "实际"],
    color: "bg-amber-100 text-amber-800",
  },
  esfp: {
    name: "娱乐家",
    description: "自发的、精力充沛的娱乐者",
    traits: ["热情", "友好", "自发"],
    color: "bg-lime-100 text-lime-800",
  },
}

// 生成9张表情包数据
function generateStickers(type: string) {
  const emotions = ["开心", "难过", "生气", "惊讶", "思考", "害羞", "兴奋", "疲惫", "爱心"]
  return emotions.map((emotion, i) => ({
    id: i + 1,
    url: `/placeholder.svg?height=400&width=400&text=${type.toUpperCase()}-${emotion}`,
    title: `${emotion}表情`,
    filename: `${type}_${emotion}.png`,
    emotion,
  }))
}

export default function MBTIPage() {
  const params = useParams()
  const type = params.type as string
  const [selectedSticker, setSelectedSticker] = useState<any>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const info = mbtiInfo[type]
  const stickers = generateStickers(type)

  if (!info) {
    return <div>MBTI类型不存在</div>
  }

  const handleStickerPreview = (sticker: any) => {
    setSelectedSticker(sticker)
    setIsPreviewOpen(true)
  }

  const handleDownload = async (sticker: any) => {
    try {
      const link = document.createElement("a")
      link.href = sticker.url
      link.download = sticker.filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("下载失败:", error)
    }
  }

  const handleDownloadAll = async () => {
    for (const sticker of stickers) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      handleDownload(sticker)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* 头部导航 */}
      <header className="border-b bg-white/80 backdrop-blur-sm supports-[backdrop-filter]:bg-white/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2 hover:bg-pink-50">
                  <ArrowLeft className="w-4 h-4" />
                  返回首页
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <Badge className={`${info.color} border-0 font-semibold text-base px-3 py-1`}>
                  {type.toUpperCase()}
                </Badge>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{info.name}</h1>
                  <p className="text-gray-600 text-sm">{info.description}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleDownloadAll}
                className="gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                <Download className="w-4 h-4" />
                下载全部
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 类型特征 */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-pink-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">性格特征</h2>
          <div className="flex flex-wrap gap-2">
            {info.traits.map((trait) => (
              <Badge key={trait} variant="secondary" className="bg-pink-50 text-pink-700 border-pink-200">
                {trait}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* 表情包网格 */}
      <main className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {stickers.map((sticker) => (
            <Card
              key={sticker.id}
              className="group overflow-hidden border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:shadow-lg hover:shadow-pink-100/50 transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <Image
                    src={sticker.url || "/placeholder.svg"}
                    alt={sticker.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />

                  {/* 悬停时显示的操作按钮 */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleStickerPreview(sticker)}
                      className="gap-1 bg-white/90 hover:bg-white"
                    >
                      <Eye className="w-4 h-4" />
                      预览
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleDownload(sticker)}
                      className="gap-1 bg-white/90 hover:bg-white"
                    >
                      <Download className="w-4 h-4" />
                      下载
                    </Button>
                  </div>

                  {/* 表情标签 */}
                  <div className="absolute bottom-2 left-2 right-2">
                    <Badge className="w-full justify-center bg-white/90 text-gray-700 border-0 text-xs">
                      {sticker.emotion}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* 悬浮按钮 */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6 py-3 gap-2"
        >
          <a href="https://kusa.pics" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-5 h-5" />
            制作更多
          </a>
        </Button>
      </div>

      {/* 表情包预览对话框 */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Badge className={`${info.color} border-0`}>{type.toUpperCase()}</Badge>
                {selectedSticker?.title}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => selectedSticker && handleDownload(selectedSticker)}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                下载
              </Button>
            </DialogTitle>
          </DialogHeader>
          {selectedSticker && (
            <div className="flex justify-center p-4">
              <Image
                src={selectedSticker.url || "/placeholder.svg"}
                alt={selectedSticker.title}
                width={400}
                height={400}
                className="max-w-full max-h-[60vh] object-contain rounded-lg"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
