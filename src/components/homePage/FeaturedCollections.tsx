const featuredCollections = [
  {
    title: "靜謐光影",
    subtitle: "Lighting",
    text: "透過低飽和度的冷色調設計，為居家空間營造沉靜、專注的氛圍。探索我們精選的極簡吊燈。",
    button: '查看燈具'
  },
  {
    title: "層次空間",
    subtitle: "Furniture",
    text: "捨棄繁雜的線條，用幾何結構與純粹色彩，勾勒出生活最原始且優雅的輪廓。",
    button: '查看擺飾'
  },
  {
    title: "生活策展",
    subtitle: "Decor",
    text: "每一件物件都是你靈魂的延伸。在黑白對比中尋找屬於自己的生活風格與溫度。",
    button: '空間提案'
  }
]
export const FeaturedCollections = () => {
  return (
    <div className="sec_2_1 bg_img_fill my-5">
      <div className="container">
        <div className="row">
          {
            featuredCollections.map(collection => {
              return (
                <div className="col-4">
                  <div className="card blur_card">
                    <div className="card-body">
                      <div className="mb-4">
                      <h5 className="card-title text-center mb-3 fw-bold">{collection.title}</h5>
                      <h6 className="card-subtitle mb-2 text-primary text-center fw-bold">{collection.subtitle}</h6>
                      </div>
                      <p className="card-text">{collection.text}</p>
                      <div className="d-flex justify-content-center mt-3">
                        <button type="button" className="btn btn-primary text-light">
                          {collection.button}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}