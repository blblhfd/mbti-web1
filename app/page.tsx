import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// 16种MBTI类型数据
const mbtiTypes = [
  { type: "INTJ", name: "建筑师", description: "富有想象力和战略性的思想家", color: "bg-purple-100 text-purple-800" },
  { type: "INTP", name: "逻辑学家", description: "具有创造性的思想家", color: "bg-blue-100 text-blue-800" },
  { type: "ENTJ", name: "指挥官", description: "大胆、富有想象力的强势领导者", color: "bg-red-100 text-red-800" },
  { type: "ENTP", name: "辩论家", description: "聪明好奇的思想家", color: "bg-orange-100 text-orange-800" },
  { type: "INFJ", name: "提倡者", description: "安静而神秘的理想主义者", color: "bg-green-100 text-green-800" },
  { type: "INFP", name: "调停者", description: "诗意、善良的利他主义者", color: "bg-teal-100 text-teal-800" },
  { type: "ENFJ", name: "主人公", description: "富有魅力的鼓舞人心的领导者", color: "bg-pink-100 text-pink-800" },
  { type: "ENFP", name: "竞选者", description: "热情、有创造力的自由精神", color: "bg-yellow-100 text-yellow-800" },
  { type: "ISTJ", name: "物流师", description: "实用主义的事实导向者", color: "bg-gray-100 text-gray-800" },
  { type: "ISFJ", name: "守护者", description: "非常专注、温暖的守护者", color: "bg-rose-100 text-rose-800" },
  { type: "ESTJ", name: "总经理", description: "出色的管理者", color: "bg-indigo-100 text-indigo-800" },
  { type: "ESFJ", name: "执政官", description: "极有同情心、受欢迎的人", color: "bg-emerald-100 text-emerald-800" },
  { type: "ISTP", name: "鉴赏家", description: "大胆而实际的实验者", color: "bg-slate-100 text-slate-800" },
  { type: "ISFP", name: "探险家", description: "灵活、有魅力的艺术家", color: "bg-violet-100 text-violet-800" },
  { type: "ESTP", name: "企业家", description: "聪明、精力充沛的感知者", color: "bg-amber-100 text-amber-800" },
  { type: "ESFP", name: "娱乐家", description: "自发的、精力充沛的娱乐者", color: "bg-lime-100 text-lime-800" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* 头部 */}
      <header className="border-b bg-white/80 backdrop-blur-sm supports-[backdrop-filter]:bg-white/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  MBTI Stickers
                </h1>
                <p className="text-gray-600 mt-1">16种人格类型表情包，每套9张精美贴纸</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-sm bg-pink-100 text-pink-700 border-pink-200">
              {mbtiTypes.length} 个类型
            </Badge>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mbtiTypes.map((mbti, index) => (
            <Link key={mbti.type} href={`/mbti/${mbti.type.toLowerCase()}`}>
              <Card className="group hover:shadow-xl hover:shadow-pink-100/50 transition-all duration-300 cursor-pointer border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={`/placeholder.svg?height=300&width=400&text=${mbti.type}表情包`}
                      alt={`${mbti.type} ${mbti.name}表情包`}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-white/90 text-gray-700 font-medium">
                        9 张
                      </Badge>
                    </div>

                    <div className="absolute top-3 left-3">
                      <Badge className={`${mbti.color} border-0 font-semibold`}>{mbti.type}</Badge>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg text-gray-800 group-hover:text-pink-600 transition-colors">
                        {mbti.name}
                      </h3>
                      <span className="text-sm text-gray-500 font-medium">({mbti.type})</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{mbti.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
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

      {/* 页脚 */}
      <footer className="border-t border-pink-100 mt-16 bg-white/50">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-semibold text-gray-700">MBTI Stickers</span>
          </div>
          <p className="text-gray-500 text-sm">
            探索你的人格类型，发现专属表情包 •
            <a
              href="https://kusa.pics"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-700 ml-1"
            >
              由 KusaPics 提供技术支持
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
