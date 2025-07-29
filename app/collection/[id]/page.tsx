"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, Download, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

// 生成单个图片集的图片数据
function generateCollectionImages(collectionId: number) {
  const imageCount = Math.floor(Math.random() * 5) + 7 // 7-11张图片
  return Array.from({ length: imageCount }, (_, i) => ({
    id: i + 1,
    url: `/placeholder.svg?height=600&width=800&text=图片${collectionId}-${i + 1}`,
    title: `图片 ${i + 1}`,
    filename: `image_${collectionId}_${i + 1}.jpg`,
  }))
}

export default function CollectionPage() {
  const params = useParams()
  const collectionId = Number.parseInt(params.id as string)
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const images = generateCollectionImages(collectionId)
  const collectionTitle = `图片集 ${collectionId}`

  const handleImagePreview = (image: any) => {
    setSelectedImage(image)
    setIsPreviewOpen(true)
  }

  const handleDownload = async (image: any) => {
    try {
      // 模拟下载功能
      const link = document.createElement("a")
      link.href = image.url
      link.download = image.filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("下载失败:", error)
    }
  }

  const handleDownloadAll = async () => {
    // 模拟批量下载
    for (const image of images) {
      await new Promise((resolve) => setTimeout(resolve, 100)) // 避免同时下载太多
      handleDownload(image)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 头部导航 */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  返回首页
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">{collectionTitle}</h1>
                <p className="text-muted-foreground">共 {images.length} 张图片</p>
              </div>
            </div>
            <Button onClick={handleDownloadAll} className="gap-2">
              <Download className="w-4 h-4" />
              下载全部
            </Button>
          </div>
        </div>
      </header>

      {/* 图片网格 */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <Card key={image.id} className="group overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.title}
                    width={800}
                    height={600}
                    className="w-full h-48 object-cover"
                  />

                  {/* 悬停时显示的操作按钮 */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary" onClick={() => handleImagePreview(image)} className="gap-1">
                      <Eye className="w-4 h-4" />
                      预览
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => handleDownload(image)} className="gap-1">
                      <Download className="w-4 h-4" />
                      下载
                    </Button>
                  </div>

                  {/* 图片编号 */}
                  <Badge className="absolute top-2 right-2 bg-black/70 text-white">{image.id}</Badge>
                </div>

                <div className="p-3">
                  <p className="text-sm font-medium">{image.title}</p>
                  <p className="text-xs text-muted-foreground">{image.filename}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* 图片预览对话框 */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedImage?.title}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => selectedImage && handleDownload(selectedImage)}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                下载
              </Button>
            </DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="flex justify-center">
              <Image
                src={selectedImage.url || "/placeholder.svg"}
                alt={selectedImage.title}
                width={800}
                height={600}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
