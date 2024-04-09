import torch
from torch.utils.data import DataLoader
from torchvision.models.detection import fasterrcnn_resnet50_fpn
from torchvision.models.detection.faster_rcnn import FastRCNNPredictor
import torchvision.transforms as T
from torchvision.datasets import CocoDetection

class CustomMosquitoDataset(CocoDetection):
    def __getitem__(self, idx):

        image, target = super().__getitem__(idx)
        return image, target

train_dataset = CustomMosquitoDataset(root="F:/mosquito/mosquito.v5i.yolov5pytorch/train/images", annFile="F:/mosquito/mosquito.v5i.yolov5pytorch/train/labels")
train_loader = DataLoader(train_dataset, batch_size=2, shuffle=True)

model = fasterrcnn_resnet50_fpn(pretrained=True)

num_classes = 2  
in_features = model.roi_heads.box_predictor.cls_score.in_features
model.roi_heads.box_predictor = FastRCNNPredictor(in_features, num_classes)

device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')
model.to(device)
optimizer = torch.optim.SGD(model.parameters(), lr=0.005, momentum=0.9, weight_decay=0.0005)
lr_scheduler = torch.optim.lr_scheduler.StepLR(optimizer, step_size=3, gamma=0.1)
num_epochs = 10


for epoch in range(num_epochs):
    model.train()
    for images, targets in train_loader:
        images = list(image.to(device) for image in images)
        targets = [{k: v.to(device) for k, v in t.items()} for t in targets]

        optimizer.zero_grad()
        outputs = model(images, targets)
        loss = sum(loss for loss in outputs.values())
        loss.backward()
        optimizer.step()

    lr_scheduler.step()
    print(f"Epoch {epoch+1}/{num_epochs}, Loss: {loss.item()}")


torch.save(model.state_dict(), "F:/mosquito/trained model")
