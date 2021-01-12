// 常用函数
import { EXIF } from 'exif-js'

// = =为了应付奇葩接口
// 对象插入合并 keyAB都存在:新值覆盖旧值 KeyB对象存在但A对象不存在:丢弃  KeyB对象存在但A对象不存在:保留
export const insertObject = function (objectA, objectB) {
  if (Object.prototype.toString.call(objectB) !== '[object Object]') {
    return objectA
  }

  const aKeys = Object.keys(objectA)
  const bKeys = Object.keys(objectB)
  return aKeys.reduce((res, key) => {
    if (bKeys.includes(key)) {
      res[key] = objectB[key]
    } else {
      res[key] = objectA[key]
    }
    return res
  }, {})
}

// 图片压缩  最大宽度1000px
export const compressImage = function (file, quality) {
  return new Promise(function (resolve, reject) {
    const name = file.name // 文件名
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = e => {
      const src = e.target.result
      const img = new Image()
      img.src = src
      img.onload = () => {
        quality = quality || 0.92 // 图片质量

        // 因人脸识别软件限制 图片大小不能超过1000px
        let w = img.width
        let h = img.height
        if (img.width > img.height && img.width > 1000) {
          w = 1000
          h = img.height / (img.width / 1000)
        } else if (img.height > img.width && img.height > 1000) {
          h = 1000
          w = img.width / (img.height / 1000)
        }

        // 生成canvas
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = w
        canvas.height = h

        // 铺底色 PNG转JPEG时透明区域会变黑色
        ctx.fillStyle = '#fff'

        // 默认旋转问题
        EXIF.getData(img, function () {
          const orientation = EXIF.getTag(this, 'Orientation')
          switch (orientation) {
            case 6: // 旋转90度
              canvas.width = h
              canvas.height = w
              ctx.rotate(Math.PI / 2)
              ctx.drawImage(this, 0, -h, w, h)
              break
            case 3: // 旋转180度
              ctx.rotate(Math.PI)
              ctx.drawImage(this, -w, -h, w, h)
              break
            case 8: // 旋转-90度
              canvas.width = h
              canvas.height = w
              ctx.rotate(3 * Math.PI / 2)
              ctx.drawImage(this, -w, 0, w, h)
              break
            default:
              ctx.drawImage(this, 0, 0, w, h)
              break
          }
          // quality值越小，所绘制出的图像越模糊
          const base64 = canvas.toDataURL('image/jpeg', quality) // 图片格式jpeg或webp可以选0-1质量区间
          // 去掉url的头，并转换为byte
          const bytes = window.atob(base64.split(',')[1])
          // 处理异常,将ascii码小于0的转换为大于0
          const ab = new ArrayBuffer(bytes.length)
          const ia = new Uint8Array(ab)
          for (let i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i)
          }

          file = new Blob([ab], { type: 'image/jpeg' })
          file.name = name
          resolve(file)
        })
      }
      img.onerror = err => {
        reject(err)
      }
    }

    reader.onerror = err => {
      reject(err)
    }
  })
}
